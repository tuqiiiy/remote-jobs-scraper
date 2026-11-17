import { Actor, log } from 'apify';
import { gotScraping } from 'got-scraping';

await Actor.init();

const input = (await Actor.getInput()) || {};
const {
    tag = 'all',
    maxJobs = 50,
    requireSalaryOnly = false,
    proxyConfiguration,
} = input;

const proxyConfig = proxyConfiguration ? await Actor.createProxyConfiguration(proxyConfiguration) : undefined;

log.info('--- Starting Remote Tech & AI Jobs Scraper ---');
log.info(`Tag Filter: ${tag}`);
log.info(`Max Jobs: ${maxJobs}`);
log.info(`Require Salary Only: ${requireSalaryOnly}`);

const apiUrl = tag === 'all' ? 'https://remoteok.com/api' : `https://remoteok.com/api?tag=${encodeURIComponent(tag)}`;
const proxyUrl = proxyConfig ? await proxyConfig.newUrl() : undefined;

try {
    log.info(`Fetching jobs from: ${apiUrl}`);
    const response = await gotScraping({
        url: apiUrl,
        proxyUrl,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'accept': 'application/json, text/plain, */*',
        },
        responseType: 'json',
        timeout: { request: 20000 },
        retry: { limit: 2 },
    });

    const data = response.body;
    if (!Array.isArray(data)) {
        log.error('Received non-array response from RemoteOK API.');
        await Actor.exit();
    }

    // RemoteOK puts legal disclaimer in data[0], real jobs start from data[1]
    const jobItems = data.slice(1);
    log.info(`Total available jobs returned by API: ${jobItems.length}`);

    let count = 0;
    for (const job of jobItems) {
        if (count >= maxJobs) break;

        const salaryMin = job.salary_min || 0;
        const salaryMax = job.salary_max || 0;
        const hasSalary = salaryMin > 0 || salaryMax > 0;

        if (requireSalaryOnly && !hasSalary) {
            continue;
        }

        let salaryFormatted = 'Not specified';
        if (salaryMin > 0 && salaryMax > 0) {
            salaryFormatted = `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()} / year`;
        } else if (salaryMin > 0) {
            salaryFormatted = `From $${salaryMin.toLocaleString()} / year`;
        } else if (salaryMax > 0) {
            salaryFormatted = `Up to $${salaryMax.toLocaleString()} / year`;
        }

        const record = {
            id: job.id ? String(job.id) : null,
            position: job.position || 'Untitled Role',
            company: job.company || 'Confidential',
            companyLogo: job.company_logo || null,
            salary: salaryFormatted,
            salaryMin: salaryMin || null,
            salaryMax: salaryMax || null,
            location: job.location || 'Worldwide (Remote)',
            tags: Array.isArray(job.tags) ? job.tags : [],
            url: job.url || null,
            applyUrl: job.apply_url || job.url || null,
            publishedAt: job.date ? new Date(job.date).toISOString() : null,
            scrapedAt: new Date().toISOString(),
        };

        await Actor.pushData(record);
        count++;
        log.info(`[${count}] "${record.position}" at ${record.company} | ${record.salary} | ${record.location}`);
    }

    log.info(`\n🎉 Scraping completed successfully! Total remote jobs saved: ${count}`);
} catch (err) {
    log.error(`Failed to scrape remote jobs: ${err.message}`);
}

await Actor.exit();
