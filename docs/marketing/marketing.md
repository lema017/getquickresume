

# GetQuickResume Marketing Plan (0 → Traction)

**Owner:** Solo founder
**Goal:** Acquire real users who complete resumes and convert a % to Premium
**Primary markets:** English + Spanish (initial)
**Primary channels (order):** SEO → Communities → PLG → Paid search (later)

---

## 0) Definitions & Success Metrics

### North Star Metric

**Resumes Generated per Day (RG/D)**
Reason: it correlates with real value + upgrade intent.

### Activation Funnel (track these events)

1. `landing_view` (by page)
2. `cta_click_start` (create/upload/import)
3. `wizard_started`
4. `resume_created`
5. `resume_generated_ai`
6. `ats_score_viewed`
7. `job_tailoring_started`
8. `pdf_download_attempt`
9. `upgrade_viewed`
10. `upgrade_purchased`

### Phase Targets

* **Phase 1 (First 100 users):** 100 registered users + 30 resumes generated
* **Phase 2 (First 1,000 users):** 1,000 registered users + 300 resumes generated
* **Phase 3 (Scaling):** 20–50 resumes generated/day consistently

---

## 1) Foundation Setup (Week 0–1)

### 1.1 Analytics & Tracking (Must-have)

**Goal:** Every action can be measured per landing page and per funnel step.

**Tasks**

* [ ] Add event tracking for key actions (above funnel).
* [ ] Track `utm_source`, `utm_medium`, `utm_campaign`, and `landing_path`.
* [ ] Enable:

  * Google Search Console
  * Google Analytics (or PostHog if you prefer product analytics)
* [ ] Create a basic dashboard:

  * Traffic by landing page
  * CTA click rate
  * Resume generated rate
  * Upgrade rate

**Acceptance criteria**

* You can answer: “Which landing page generates the most resumes?”

---

### 1.2 SEO Infrastructure (Must-have)

**Goal:** Make sure Google can crawl, understand, and index your landing pages.

**Tasks**

* [ ] Ensure each landing page has:

  * Unique `<title>`
  * Unique `<meta name="description">`
  * Correct canonical self-reference
  * Exactly one H1
* [ ] Add internal links to all 5 landing pages from:

  * Footer (minimum)
  * Homepage (ideal)
* [ ] Update `sitemap.xml` to include:

  * `/ats-resume-checker`
  * `/resume-for-job-description`
  * `/ai-resume-builder`
  * `/resume-translator`
  * `/resume-templates`
* [ ] Verify `robots.txt` allows crawling.

**Acceptance criteria**

* Search Console shows these pages discovered and indexed.

---

### 1.3 Conversion Hygiene (Must-have)

**Goal:** Landing pages don’t leak users.

**Tasks**

* [ ] One clear primary CTA above the fold on each page.
* [ ] Secondary CTA available (upload/import).
* [ ] Trust signals on every page:

  * “No credit card required”
  * “ATS-friendly”
  * “Privacy note for uploads”

**Acceptance criteria**

* CTA click rate ≥ 3–8% on at least one landing page (initial benchmark).

---

## 2) SEO Plan (Weeks 1–12)

### 2.1 Landing Page Keyword Intent Map

**Goal:** Each page matches a specific search intent.

| URL                           | Primary intent           | Primary keyword examples                                             |
| ----------------------------- | ------------------------ | -------------------------------------------------------------------- |
| `/ats-resume-checker`         | Diagnose ATS issues      | “ATS resume checker”, “resume ATS score”                             |
| `/resume-for-job-description` | Tailor to a job          | “resume tailored to job description”, “tailor resume to job posting” |
| `/ai-resume-builder`          | Create quickly           | “AI resume builder”, “create resume with AI”                         |
| `/resume-translator`          | Translate professionally | “resume translation”, “translate resume to English”                  |
| `/resume-templates`           | See templates            | “professional resume templates”, “ATS resume templates”              |

**Tasks**

* [ ] Ensure H1 includes primary intent phrase
* [ ] Include 2–3 semantic variants in H2 sections

---

### 2.2 Programmatic SEO (High Leverage)

**Goal:** Build many intent pages with minimal manual work.

#### Tier 1 (Recommended first)

* `/resume-examples/{profession}`
* `/resume-template/{profession}`
* `/ats-resume-checker/{profession}`

**Example professions list**

* Software Engineer, Data Analyst, Project Manager, Accountant, Nurse, Customer Service, Sales, Marketing, Teacher, UX Designer

**Tasks**

* [ ] Create a data file `data/professions.json`
* [ ] Create a route template `src/pages/pseo/ProfessionLanding.tsx`
* [ ] Generate pages dynamically from `professions.json`
* [ ] Add to sitemap automatically

**Acceptance criteria**

* 50–200 pages created without manual duplication.

---

### 2.3 Blog Content (Low volume, high intent)

**Goal:** Build authority + capture long-tail queries.

**First 10 posts (English)**

1. “ATS Resume Checker: What It Is and How to Fix Your Resume”
2. “How to Tailor Your Resume to a Job Description (Step-by-step)”
3. “Best ATS Resume Templates (And What to Avoid)”
4. “Resume Keywords: How to Find and Use Them”
5. “One Resume per Job: Why It Works”
6. “How to Translate a Resume to English (Without Sounding Robotic)”
7. “ATS Resume Formatting Rules Recruiters Prefer”
8. “Resume Bullet Points That Get Interviews (With Examples)”
9. “How to Write Achievements (STAR method examples)”
10. “Best Resume for Career Switchers (Examples)”

**Spanish versions** (translate top performers later).

**Acceptance criteria**

* Organic impressions rising week-over-week.

---

## 3) Product-Led Growth (Weeks 1–8)

### 3.1 Viral Loop: Resume Sharing

**Goal:** Every shared resume becomes a marketing surface.

**Tasks**

* [ ] Add “Created with GetQuickResume” footer on shared resumes:

  * “Create your ATS-optimized resume (free)”
* [ ] Add share page CTA above-the-fold:

  * “Create your own resume”
* [ ] Track events:

  * `resume_shared`
  * `public_resume_view`
  * `public_resume_to_signup`

**Acceptance criteria**

* Shares per generated resume ≥ 0.05 early (1 share per 20 resumes)

---

### 3.2 Upgrade Triggers (Conversion)

**Goal:** Convert based on pain moments, not price.

**Triggers**

* ATS score < 8 → “Unlock full checklist”
* Job match < 70% → “Tailor for this job”
* Download attempt → “Unlimited downloads with Premium”
* Translation attempt → “Unlock translation”

**Tasks**

* [ ] Add upgrade modal copy variants (A/B later).
* [ ] Make upgrade prompts contextual, short, and outcome-based.

**Acceptance criteria**

* Initial Premium conversion target: 1–3% of activated users

---

## 4) Community Distribution (Weeks 1–6)

### 4.1 Where to Post (Low budget)

**Targets**

* Reddit: r/resumes, r/careerguidance, r/jobs, r/resumehelp
* LinkedIn: comments on resume advice posts (high visibility)
* Facebook groups (Spanish job seeking groups)
* Discord communities for job seekers

**Rules**

* Provide value first, link second.
* Don’t spam; respond to people asking for help.

---

### 4.2 Weekly Execution (repeatable)

**Weekly targets**

* 20 helpful comments (Reddit/LinkedIn)
* 5 direct posts with actionable advice
* 5 DMs to people asking for resume feedback (soft offer)

**DM template (short)**
“Hey — if you want, I can share a free ATS checklist and a tool that scores your resume and suggests improvements. Want it?”

**Acceptance criteria**

* 20–50 visits/week from community sources
* At least 5 activated users/week early

---

## 5) Paid Acquisition (Only after conversion proof)

### 5.1 When to Start Ads

Start only if:

* You already have:

  * ≥ 5–10 resumes generated/day from organic/community
  * Stable funnel tracking
  * Proven upgrade triggers

### 5.2 What to Run

**Only Google Search** initially.

**Campaign**

* ATS Resume Checker
* Tailor resume to job description

**Budget**

* $5–10/day

**Landing pages**

* `/ats-resume-checker`
* `/resume-for-job-description`

**Acceptance criteria**

* CPC sustainable
* Cost per activated user acceptable
* Do not scale until ROI is understood

---

## 6) 30–60–90 Day Plan (Execution Timeline)

### Days 1–30

**Ship & Validate**

* [ ] Perfect the 5 landing pages: title/meta/H1/canonical
* [ ] Add internal linking + sitemap updates
* [ ] Add full funnel tracking
* [ ] Community posting cadence started
* [ ] Publish 4 SEO posts

**Success looks like**

* 100 users
* 30 resumes generated
* First organic impressions rising

---

### Days 31–60

**Build Compounding SEO**

* [ ] Programmatic SEO (professions)
* [ ] Translate top pages to Spanish (or build /es routes)
* [ ] Add share loop improvements
* [ ] Publish 6 additional posts

**Success looks like**

* 500–1,000 users
* 150–300 resumes generated total
* Shares occurring naturally

---

### Days 61–90

**Optimize & Scale**

* [ ] Improve conversion rate (CTA tests, hero copy tests)
* [ ] Add FAQ schema to top pages
* [ ] Consider Google Search ads (small budget)
* [ ] Double down on best-performing landing page

**Success looks like**

* 1,000+ users
* 20–50 resumes generated/day (or trending up)
* Premium conversions consistently happening

---

## 7) Cursor Execution Workflow (How to run this plan)

Create a folder in your repo:

```
/marketing/
  MARKETING_PLAN.md
  /checklists/
    seo-checklist.md
    launch-checklist.md
  /copy/
    landing-pages/
    ads/
  /seo/
    keywords.md
    sitemap-notes.md
```

**How to execute step-by-step using Cursor**

1. Pick a section (e.g., “SEO Infrastructure”)
2. Open the relevant files (router, pages, i18n, sitemap generator)
3. Paste a targeted Cursor prompt:

   * “Implement titles/meta/canonicals for these 5 routes…”
4. Deploy
5. Verify in Search Console
6. Log results in `/marketing/notes.md`

---

## 8) Immediate Next Action (Do this first)

If you do nothing else today:

1. Ensure all 5 pages have **unique title/meta/canonical**
2. Add them to **sitemap + internal links**
3. Verify tracking events per page

That alone will drastically increase your chance of ranking + converting.

---

If you want, I can generate:

* A **Cursor prompt pack** to implement Sections 1.1, 1.2, and 1.3 in code
* SEO titles/meta descriptions for each of the 5 pages (EN + ES)
* A `marketing/` folder structure + initial markdown files content you can commit immediately
