# Kickresume vs GetQuickResume – Sitemap & SEO Pages Analysis

This document analyzes the Kickresume sitemap files (copied under `docs/marketing/kickresume/`) and compares them to GetQuickResume’s SEO pages (resume + resume-skills pages in our sitemap).

---

## 1. Kickresume sitemap structure and URL counts

Kickresume’s root [sitemap.xml](https://www.kickresume.com/sitemap.xml) is a **sitemap index** that points to the following child sitemaps. Counts below are from the copied XML files (count of `<loc>` entries).

| Sitemap file | URL count | Description |
|-------------|-----------|-------------|
| **sitemap-page.xml** | 342 | Main site pages: home, pricing, templates, tools, help-center, students, press, about, contact, feedback, AI tools (resume writer, cover letter, ATS checker, etc.) in 6 locales (en, sk, es, de, pt, it). |
| **sitemap-misc.xml** | 8 | Misc: login, register, terms, privacy, VOP, books. |
| **sitemap-article.xml** | 204 | Blog/help-center articles (how-to-write profile, education, experience, skills, cover letter guides, alternatives to Zety/Rezi/Enhancv/Teal, resume format, AI tools, resignation, etc.) in 6 locales. |
| **sitemap-resume-sample.xml** (×7 paginated) | **13,494** total | Individual **resume sample** pages. Each sample has 6 language versions. **Unique resume samples ≈ 2,249** (13,494 ÷ 6). |
| **sitemap-resume-sample-category.xml** | 1,158 | Category landing pages for resume samples (e.g. “accounting-finance-resume-samples”) in 6 locales. **Unique categories ≈ 193**. |
| **sitemap-cover-letter-sample.xml** (×5 paginated) | **8,202** total | Individual **cover letter sample** pages. **Unique cover letter samples ≈ 1,367**. |
| **sitemap-cover-letter-sample-category.xml** | 1,110 | Category landing pages for cover letter samples. **Unique categories ≈ 185**. |
| **sitemap-company.xml** | 497 | **Company-specific** pages (e.g. “amazon-company-samples”, “google-company-samples”) – EN only in the copied file. |

**Kickresume total (from copied sitemaps):** ~**25,015** URLs.

**Note:** The index also references `sitemap-author.xml` and `sitemap-cv.xml`, which were not in the copied set. Their totals are not included above.

---

## 2. GetQuickResume SEO pages (resume + resume-skills)

Our sitemap defines:

| Source | Count | Description |
|--------|-------|-------------|
| **sitemap-pages.xml** | 19 | Static + blog (home, create, pricing, tools, blog, about, contact, login, premium, 8 blog articles). |
| **sitemap-professions-en.xml** | 675 | Profession resume pages (EN): `/resume/:slug`. |
| **sitemap-professions-es.xml** | 675 | Same 675 professions (ES): alternate URLs. |
| **sitemap-skills-en.xml** | 500 | Skill pages (EN): `/resume-skills/:slug`. |
| **sitemap-skills-es.xml** | 500 | Same 500 skills (ES): alternate URLs. |

- **Unique SEO pages (resume + resume-skills):** 675 + 500 = **1,175** (each with EN/ES in sitemap).
- **Total URLs in our sitemap:** 19 + 675×2 + 500×2 = **2,369**.

---

## 3. Comparison summary

| Metric | Kickresume (from copied sitemaps) | GetQuickResume |
|--------|-----------------------------------|----------------|
| **Total sitemap URLs** | ~25,015 | 2,369 |
| **Resume-by-role/sample pages (unique)** | ~2,249 resume samples | 675 profession pages |
| **Resume category pages** | ~193 categories × 6 locales | 0 |
| **Cover letter sample pages** | ~1,367 | 0 (cover letter behind auth) |
| **Cover letter category pages** | ~185 categories × 6 | 0 |
| **Company pages** | 497 | 0 |
| **Skill-focused pages** | (mixed in samples/categories) | 500 skill pages |
| **Main/tools/articles** | 342 + 8 + 204 | 19 |

Kickresume has many more indexable URLs overall. We have a smaller, focused set: **1,175 unique resume/skill SEO pages** (professions + skills) plus 19 static/blog pages.

---

## 4. Kickresume URL patterns (for reference)

- **Resume samples (EN):**  
  `https://www.kickresume.com/en/help-center/{slug}-resume-sample/`  
  Example: `front-end-developer-resume-sample`, `nurse-resume-sample`.
- **Resume sample categories (EN):**  
  `https://www.kickresume.com/en/help-center/{category}-resume-samples/`  
  Example: `accounting-finance-resume-samples`.
- **Cover letter samples (EN):**  
  `https://www.kickresume.com/en/help-center/{slug}-cover-letter-sample/`
- **Company (EN):**  
  `https://www.kickresume.com/en/help-center/{company}-company-samples/`

Our patterns:

- **Profession:** `https://getquickresume.com/resume/{slug}` (e.g. `account-manager`, `nurse`).
- **Skill:** `https://getquickresume.com/resume-skills/{slug}` (e.g. `angular`, `project-management`).

---

## 5. SEO page types Kickresume has that we do not

1. **Resume sample category pages** – Category/landing pages that group resume samples (e.g. by industry). We have no equivalent category layer.
2. **Individual “resume sample” pages** – They have ~2,249 sample pages (one per example resume). We have one page per **profession** (675), not per sample; different content model.
3. **Cover letter sample pages (public SEO)** – ~1,367 public cover letter example pages. Our cover letter is behind auth and not in the sitemap.
4. **Cover letter sample category pages** – Category pages for cover letter samples. We have none.
5. **Company pages** – 497 company-specific pages (e.g. “resume for Amazon”). We have no company-targeted SEO.
6. **Author pages** – Referenced in their index as `sitemap-author.xml` (not in copied set). We have no author pages.
7. **Dedicated CV sitemap** – Referenced as `sitemap-cv.xml` (not in copied set). We use “resume” only.

---

## 6. Resume/skill overlap (conceptual)

- **Kickresume:** Many resume sample URLs with slugs like `front-end-developer-resume-sample`, `administrative-assistant-resume-sample`, `project-manager-resume-sample`, `nurse-resume-sample`. Multiple samples can map to the same role (e.g. “Senior Manager”, “Senior Manager 1”).
- **GetQuickResume:** Single profession page per role (e.g. `/resume/administrative-assistant`, `/resume/project-manager`, `/resume/nurse`). We also have **500 skill pages** (`/resume-skills/:slug`), which they don’t have as a separate, dedicated layer.

So: they have more *individual sample* URLs; we have a cleaner *one page per profession* plus a dedicated *skill* SEO layer. A slug-by-slug list of “Kickresume sample roles we don’t have as professions” would require extracting all unique EN resume-sample slugs and comparing to our 675 profession slugs and 500 skill slugs (e.g. via a small script).

---

### Slug comparison (exact match)

To regenerate the list of **Kickresume sample roles we don't have as professions or skills**, run:

```bash
node scripts/compare-kickresume-roles.mjs
```

- **Kickresume EN resume-sample slugs (unique):** 2,245 (from all `sitemap-resume-sample*.xml` files).
- **GQR profession slugs:** 675 (from `sitemap-professions-en.xml`).
- **GQR skill slugs:** 500 (from `sitemap-skills-en.xml`).
- **Kickresume slugs with an exact match in GQR:** 210.
- **Kickresume sample roles we don't have (exact match):** **2,035** — full list in **`kickresume_roles_not_in_gqr.txt`**.

Exact match undercounts overlap: many Kickresume slugs are company-prefixed or numbered variants. The full 2,035 entries are in `kickresume_roles_not_in_gqr.txt`.

---

## 7. Files in this folder

- `sitemap-page.xml`
- `sitemap-misc.xml`
- `sitemap-article.xml`
- `sitemap-resume-sample.xml`, `sitemap-resume-sample2.xml` … `sitemap-resume-sample 7.xml`
- `sitemap-resume-sample-category.xml`
- `sitemap-cover-letter-sample.xml`, `sitemap-cover-letter-sample (1).xml` … `sitemap-cover-letter-sample (4).xml`
- `sitemap-cover-letter-sample-category.xml`
- `sitemap-company.xml`
- **List of Kickresume roles not in GQR:** `kickresume_roles_not_in_gqr.txt` (generated by `node scripts/compare-kickresume-roles.mjs`)
- `KICKRESUME_VS_GQR_SITEMAP_ANALYSIS.md` (this file)

Not copied: `sitemap-author.xml`, `sitemap-cv.xml`.
