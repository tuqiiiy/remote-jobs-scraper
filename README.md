# 💼 Remote Tech & AI Jobs Scraper (with Salaries)

Extract high-paying remote job listings across **software engineering, artificial intelligence, product management, design, and marketing** from RemoteOK. Includes transparent salary ranges, company names, direct apply links, and required skill tags.

---

## 🌟 Why Use Remote Jobs Scraper?

Remote hiring is more competitive than ever. Whether you run a specialized job board, a recruiting agency (headhunting), or want to aggregate developer jobs into a newsletter or telegram channel, this Actor delivers clean, real-time job leads in seconds.

* 💰 **Salary Transparency:** Filter and extract verified annual salary ranges (e.g. `$120,000 - $180,000 / year`).
* 🏷️ **Tag & Skill Filtering:** Target jobs by role (`dev`, `ai`, `engineer`, `marketing`, `sales`, `design`, `crypto`).
* 🔗 **Direct Application Links:** Get direct URLs to the job posting and company application page.
* ⚡ **Fast & Lightweight:** Pure API integration with minimal Apify compute cost.
* 📊 **Export Anywhere:** Download your data in CSV/JSON/Excel or connect to Google Sheets, Make, Zapier, or Airtable.

---

## 📥 Input Options

| Parameter | Type | Default | Description |
|---|---|---|---|
| `tag` | String | `"all"` | Filter by skill/tag: `all`, `dev`, `ai`, `engineer`, `marketing`, `sales`, `design`, `management`, `finance`, `crypto`. |
| `maxJobs` | Integer | `50` | Maximum number of job postings to retrieve. |
| `requireSalaryOnly` | Boolean | `false` | If true, only jobs with transparent salary figures are extracted. |
| `proxyConfiguration` | Object | `null` | Optional proxy configuration. |

---

## 📤 Sample Output (JSON)

```json
{
  "id": "1137796",
  "position": "Senior AI Infrastructure Engineer",
  "company": "Nexus AI",
  "companyLogo": "https://remoteok.com/assets/...",
  "salary": "$150,000 - $190,000 / year",
  "salaryMin": 150000,
  "salaryMax": 190000,
  "location": "Worldwide (Remote)",
  "tags": ["ai", "python", "kubernetes", "cloud"],
  "url": "https://remoteok.com/remote-jobs/...",
  "applyUrl": "https://jobs.lever.co/...",
  "publishedAt": "2026-11-17T08:00:00.000Z",
  "scrapedAt": "2026-11-17T11:46:00.000Z"
}
```

---

## 💼 High-Value Use Cases

1. **Job Board Aggregators:** Populate your niche job site or job board aggregator with fresh, high-paying remote roles.
2. **Talent Recruitment & Headhunting:** Identify which startups and companies are actively hiring in specific tech stacks.
3. **Automated Newsletters & Alerts:** Power a "Weekly Remote AI Jobs" newsletter with automated data.
