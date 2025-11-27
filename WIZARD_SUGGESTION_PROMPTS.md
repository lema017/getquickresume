# Wizard Suggestion Prompts

This document contains all the prompts used for generating suggestions in the wizard steps.

**Location:** `api/src/services/aiService.ts`

---

## 1. Profession Skills Suggestions (Step 2)

**Method:** `buildBilingualProfessionSuggestionsPrompt()`

**Used in:** Step 2 - Skills selection

**Prompt:**
```
You are an expert in human resources and recruitment with over 20 years of experience. Your task is to generate a comprehensive list of skills (including tools, technologies, and competencies) for the profession "${profession}" in SPANISH and ENGLISH.

**Instructions:**
1. Generate 20-30 skills relevant for this profession IN SPANISH
2. Generate 20-30 skills relevant for this profession IN ENGLISH
3. Skills should include:
   - Technical skills (programming languages, frameworks, methodologies)
   - Tools and software (IDEs, platforms, databases, cloud services)
   - Soft skills (leadership, communication, problem-solving)
   - Technologies and platforms specific to this profession
4. All suggestions should be specific and current (2025)
5. Consider different experience levels (junior, mid, senior)
6. Include emerging technologies and current industry trends
7. Do NOT separate tools from skills - everything should be in a single "skills" array
8. Respond ONLY with a valid JSON object

**Required response format (EXACTLY this structure):**
{
  "es": {
    "skills": ["JavaScript", "React", "AWS", "Leadership", "Docker", "Problem Solving", ...]
  },
  "en": {
    "skills": ["JavaScript", "React", "AWS", "Leadership", "Docker", "Problem Solving", ...]
  }
}

**Profession:** ${profession}

Generate specific and relevant skills for this profession in both languages:
```

**Response Format:**
```json
{
  "es": {
    "skills": ["skill1", "skill2", ...]
  },
  "en": {
    "skills": ["skill1", "skill2", ...]
  }
}
```

---

## 2. Achievement Suggestions (Step 6)

**Method:** `buildAchievementSuggestionsPrompt()`

**Used in:** Step 6 - Achievements (based on projects entered in Step 5)

**Prompt:**
```
You are an expert career coach with over 20 years of experience. Generate 3-5 key achievements for a ${profession} based on their projects.

**Projects:**
${projectList}

**Instructions:**
Generate achievements that:
1. Highlight results and impact in a general manner
2. Show leadership and initiative
3. Are relevant to the ${profession} profession
4. Are written in ${languageText} language
5. Are professional and compelling for a resume
6. Focus on business value and outcomes

**Required response format (EXACTLY this structure):**
[
  { "title": "Achievement Title", "description": "Detailed description with impact" },
  { "title": "Achievement Title", "description": "Detailed description with impact" },
  { "title": "Achievement Title", "description": "Detailed description with metrics and impact" }
]

**Profession:** ${profession}
**Language:** ${languageText}

Generate specific and relevant achievements based on the projects provided:
```

**Variables:**
- `${profession}` - User's profession
- `${projectList}` - Formatted list of projects with name, description, and technologies
- `${languageText}` - "Spanish" or "English" based on user's language selection

**Response Format:**
```json
[
  {
    "title": "Achievement Title",
    "description": "Detailed description with metrics and impact"
  },
  ...
]
```

---

## 3. Summary Suggestions (Step 7)

**Method:** `buildSummarySuggestionsPrompt()`

**Used in:** Step 7 - Professional Summary

**Prompt:**
```
You are an expert career coach and resume writer with over 20 years of experience. Generate 3 professional summary suggestions for a ${profession} based on their achievements and projects.

**Profession:** ${profession}
**Language:** ${languageText}
**Type:** ${type}

**Achievements:**
- ${achievementsList}

**Projects:**
- ${projectsList}

**Instructions:**
${typeInstructions[type]}

**Requirements:**
1. Each suggestion should be 1-2 lines maximum
2. Be professional and compelling
3. Use the ${languageText} language
4. Base suggestions on the provided achievements and projects
5. Make them specific and relevant to the ${profession} profession
6. Avoid generic phrases - make them personal and unique

**Required response format (EXACTLY this structure):**
[
  "Suggestion 1",
  "Suggestion 2", 
  "Suggestion 3"
]

Generate specific and relevant ${type} suggestions based on the provided information:
```

**Type Instructions:**

**For `experience` type:**
```
Generate 3 professional phrases that summarize the candidate's experience in 1-2 lines each, as if answering: "How would you describe your experience in one sentence?". They should be complete, descriptive sentences that work as an elevator pitch. Focus on: years of experience, area of specialization, notable achievements, and key technologies/methodologies.
```

**For `differentiators` type:**
```
Generate 3 concise phrases (1-2 lines each) that explain what differentiates this professional from others, as if answering: "What makes you different from other professionals?". Focus on: unique skill combinations, distinctive approaches, special strengths, particular experiences that make them stand out in their field.
```

**Variables:**
- `${profession}` - User's profession
- `${languageText}` - "Spanish" or "English"
- `${type}` - "experience" or "differentiators"
- `${achievementsList}` - List of user's achievements
- `${projectsList}` - List of project descriptions

**Response Format:**
```json
[
  "Suggestion 1",
  "Suggestion 2",
  "Suggestion 3"
]
```

---

## 4. Job Title Achievement Suggestions (Step 3)

**Method:** `buildJobTitleAchievementsPrompt()`

**Used in:** Step 3 - Work Experience (when user enters a job title)

**Prompt:**
```
You are an expert career coach and HR professional with over 20 years of experience. Generate 5 achievements for the job title "${jobTitle}".

**Instructions:**
1. Generate achievements that are realistic and typical for this job title
2. Focus on business impact and value delivered
3. Use professional language in ${languageText}
4. Make achievements diverse (different types of impact)
5. Each achievement should be 1-2 lines maximum
6. Include both technical and business achievements
7. Use strong action verbs

**Requirements:**
- Each achievement should be a complete sentence
- Focus on results, not just responsibilities
- Make them compelling for a resume
- Use industry-standard terminology
- **DO NOT include specific numbers, percentages, timeframes, or metrics** (e.g., avoid "30%", "3 months", "$500K", etc.)
- Keep achievements general and let users add their own specific details
- Focus on the type of impact and value delivered, not quantified results

**Required response format (EXACTLY this structure):**
[
  "Achievement 1",
  "Achievement 2", 
  "Achievement 3",
  "Achievement 4",
  "Achievement 5"
]

**Job Title:** ${jobTitle}
**Language:** ${languageText}

Generate specific and relevant achievements for this job title (without specific metrics or numbers):
```

**Variables:**
- `${jobTitle}` - The job title entered by the user
- `${languageText}` - "Spanish" or "English"

**Response Format:**
```json
[
  "Achievement 1",
  "Achievement 2",
  ...
]
```

**Example Good Achievements (without metrics):**
- "Implemented agile methodologies that improved team productivity and reduced software defects"
- "Led cross-functional teams to deliver critical software projects ahead of schedule"
- "Spearheaded migration of legacy systems to cloud-based architecture, enhancing scalability and reducing operational costs"

**Example Bad Achievements (with fake metrics - DO NOT generate these):**
- "Implemented agile methodologies that improved team productivity by 30% and reduced software defects by 25%"
- "Led a cross-functional team to deliver a critical software project three months ahead of schedule, resulting in a 20% increase in company revenue"

---

## AI Provider Selection

**Note:** All suggestion features are **FREE** for all users (both free and premium).

Currently, suggestions use the default AI provider configured in the environment:
- Default: OpenAI (from `AI_PROVIDER` env var)
- Can be: OpenAI, Anthropic, or Groq

**Future Enhancement:** Suggestions could also be routed based on user type (Groq for free, OpenAI for premium) similar to resume generation, but currently they use the default provider.

---

## Usage in Wizard Steps

1. **Step 2 (Skills):** Uses `generateProfessionSuggestions()` - Returns bilingual skills
2. **Step 3 (Experience):** Uses `generateJobTitleAchievements()` - Returns typical achievements for a job title
3. **Step 6 (Achievements):** Uses `generateAchievementSuggestions()` - Returns achievements based on projects
4. **Step 7 (Summary):** Uses `generateSummarySuggestions()` - Returns summary phrases (experience or differentiators)

---

## Response Parsing

All prompts require JSON responses. The parsing methods:
- Clean markdown code blocks (```json)
- Validate structure
- Handle errors gracefully
- Return typed responses

**Error Handling:**
- Invalid JSON → Logs raw response and throws error
- Missing required fields → Throws validation error
- Empty responses → Throws error

