# Resume Generation Prompt and Cost Analysis

## 📋 Full Prompt Used for Final Resume Generation

The prompt is built in `api/src/services/aiService.ts` in the `buildPrompt()` method (lines 41-270).

### Prompt Structure

```84:267:api/src/services/aiService.ts
    const prompt = `You are an **expert recruiter and resume writer** with over 20 years of experience.  
Your task is to generate a **professional, ATS-optimized resume focused on measurable results** in **valid JSON format**, based on the information provided by the user.

The resume should highlight **impact, leadership, and technical skills** in a concise, natural way without redundancies.  
The language must be **${outputLanguage}**, with **${tone}** tone, adapted to **${targetLevel}** experience level.

---

### 🧩 User Information

- **Profession:** ${profession}  
- **Desired position description:** ${jobDescription || 'Not provided; generate a general profile related to the profession.'}

**Personal data:**  
${firstName} ${lastName} — ${email} — ${phone} — ${country}  
LinkedIn: ${linkedin || 'N/A'}

**Professional summary:**  
${summary || 'Not provided. Create one in first person, powerful and professional.'}

**Skills (including tools and technologies):**  
${skillsRaw.join(', ') || 'N/A'}

**Work experience:**  
${experience.length > 0 ? experience.map(exp => `
- ${exp.title} (${exp.company}, ${exp.startDate} - ${exp.isCurrent ? 'Current' : exp.endDate})
  Responsibilities: ${exp.responsibilities.join('; ')}
  Achievements: ${exp.achievements.join('; ')}
`).join('\n') : '- No work experience provided.'}

**Education:**  
${education.length > 0 ? education.map(edu => `
- ${edu.degree} in ${edu.field} (${edu.institution}, ${edu.startDate} - ${edu.isCompleted ? edu.endDate : 'In progress'})
`).join('\n') : '- No education provided.'}

**Certifications:**  
${certifications.length > 0 ? certifications.map(cert => `
- ${cert.name} (${cert.issuer}, ${cert.date})
`).join('\n') : '- No certifications provided.'}

**Projects:**  
${projects.length > 0 ? projects.map(proj => `
- ${proj.name}: ${proj.description} (${proj.startDate} - ${proj.isOngoing ? 'Ongoing' : proj.endDate})
  Technologies: ${proj.technologies.join(', ')}
`).join('\n') : '- No projects provided.'}

**Languages:**  
${languages.length > 0 ? languages.map(lang => `- ${lang.name} (${lang.level})`).join('\n') : '- No languages provided.'}

**Additional achievements:**  
${achievements.length > 0 ? achievements.map(ach => `- ${ach.description} (${ach.year})`).join('\n') : '- N/A'}

---

### ⚙️ Generation Instructions

**Output format:**  
Return **only a valid JSON object** following the \`GeneratedResume\` interface.  
Do not include additional text, headers, or markdown.

---

### 🧱 Generation Rules

1. **Professional Summary Optimization**
   - Must be in **first person** ("I am", "I have", "I led").  
   - Length: 3–4 short paragraphs.  
   - Integrate **professional storytelling** (career path + impact + purpose).  
   - Mention **realistic metrics** (efficiency, deployment, quality, costs, security).  
   - Add **ATS keywords** from the industry.

2. **Work Experience**
   - Merge responsibilities and achievements, avoiding repetitions.  
   - 3–5 bullets per position with **Action + Result + Metric** structure.  
   - Use executive tone, without redundancy.

3. **Skills**
   - Add relevant soft skills for the level (e.g. leadership, communication, mentoring).

4. **Education**
   - Summarize in one line.  
   - Include \`relevantCoursework\` or \`honors\` if applicable.

5. **Certifications and Projects**
   - Connect each certification with 2–3 practical skills.  
   - For projects, include 2–3 technical achievements and measurable impact (performance, adoption, innovation).

6. **Languages and Achievements**
   - Keep brief format: "Spanish (Native)", "English (Advanced)".  
   - In achievements, prioritize measurable results or recognitions.

7. **ATS Optimization**
   - Use technical terms distributed naturally.  
   - Avoid repetitions between sections.  
   - Ensure clarity, clean format and relevant keywords.  
   - Do not generate unnecessary text or generic descriptions.

8. **Personalization**
   - Adapt narrative and metrics to experience level (${targetLevel}).  
   - Emphasize the **candidate's unique value proposition** (what distinguishes them).  
   - Maintain narrative and temporal consistency.

Here is the TypeScript interface for the JSON object you must generate:

\`\`\`typescript
interface GeneratedResume {
  professionalSummary: string;
  experience: EnhancedExperience[];
  education: EnhancedEducation[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projects: EnhancedProject[];
  certifications: EnhancedCertification[];
  achievements: string[];
  languages: LanguageProficiency[];
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  metadata: {
    generatedAt: string;
    tokensUsed: number;
    aiProvider: string;
    model: string;
  };
}

interface EnhancedExperience {
  title: string;
  company: string;
  duration: string;
  location?: string;
  description: string;
  achievements: string[];
  skills: string[];
  impact: string[];
}

interface EnhancedEducation {
  degree: string;
  institution: string;
  field: string;
  duration: string;
  gpa?: string;
  relevantCoursework: string[];
  honors: string[];
}

interface EnhancedProject {
  name: string;
  description: string;
  technologies: string[];
  duration: string;
  url?: string;
  achievements: string[];
  impact: string;
}

interface EnhancedCertification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

interface LanguageProficiency {
  language: string;
  level: string;
  certifications: string[];
}
\`\`\``;
```

## 📊 Token Usage Analysis

### Current Token Estimation

The code currently uses a **simple estimation formula** instead of actual API token counts:

```790:792:api/src/services/aiService.ts
      // Calcular tokens usados (estimación aproximada)
      const tokensUsed = Math.ceil(cleanResponse.length / 4) + Math.ceil(this.buildPrompt(originalData).length / 4);
      parsed.metadata.tokensUsed = tokensUsed;
```

**Formula:** `(response_length / 4) + (prompt_length / 4)`

This is a rough approximation (assumes ~4 characters per token).

### Actual API Token Usage

The OpenAI API **does return actual token counts** in the response, but they're not currently being used:

```993:1000:api/src/services/aiService.ts
    // Log response details for debugging
    console.log('OpenAI API response details:', {
      model: this.config.model,
      responseLength: content.length,
      finishReason: data.choices[0]?.finish_reason,
      usage: data.usage,
      hasContent: !!content
    });
```

The `data.usage` object contains:
- `prompt_tokens`: Actual tokens in the prompt
- `completion_tokens`: Actual tokens in the response
- `total_tokens`: Total tokens used

### Average Prompt Size

**Base prompt template (texto fijo sin datos del usuario):** 
- **4,342 caracteres** (~1,085 tokens)
- Este es el tamaño del template base con placeholders para variables

**Base prompt size (with minimal user data):** ~4,500-5,000 characters (~1,125-1,250 tokens)

**Variable components:**
- User personal info: ~100-200 characters
- Skills: ~200-1,000 characters (depends on number of skills)
- Work experience: ~500-3,000 characters per position
- Education: ~100-300 characters per entry
- Projects: ~200-500 characters per project
- Certifications: ~50-150 characters per certification

**Estimated average prompt size:**
- **Small resume** (entry level, 1-2 jobs): ~3,500-5,000 characters (~875-1,250 tokens)
- **Medium resume** (mid level, 3-5 jobs): ~5,000-8,000 characters (~1,250-2,000 tokens)
- **Large resume** (senior/executive, 5+ jobs): ~8,000-15,000 characters (~2,000-3,750 tokens)

### Average Response Size

The response is a JSON object with the generated resume. Typical sizes:

- **Small resume response:** ~3,000-5,000 characters (~750-1,250 tokens)
- **Medium resume response:** ~5,000-8,000 characters (~1,250-2,000 tokens)
- **Large resume response:** ~8,000-12,000 characters (~2,000-3,000 tokens)

### 📝 Tamaño Promedio del CV Generado (Caracteres)

**Respuesta JSON completa:**
- CV pequeño (entry level): **3,000-5,000 caracteres**
- CV mediano (mid level): **5,000-8,000 caracteres**
- CV grande (senior/executive): **8,000-12,000 caracteres**
- **Promedio general: ~5,500-6,500 caracteres**

**Contenido real del CV (sin estructura JSON):**
El JSON incluye metadatos, estructura y campos técnicos. El contenido real del CV (texto visible) es aproximadamente:

- CV pequeño: **2,000-3,500 caracteres** (~400-700 palabras)
- CV mediano: **3,500-5,500 caracteres** (~700-1,100 palabras)
- CV grande: **5,500-8,000 caracteres** (~1,100-1,600 palabras)
- **Promedio del contenido: ~4,000-4,500 caracteres** (~800-900 palabras)

**Desglose típico del contenido:**
- Professional Summary: ~500-800 caracteres
- Work Experience (por posición): ~800-1,500 caracteres
- Education: ~200-400 caracteres
- Skills: ~300-600 caracteres
- Projects: ~400-800 caracteres por proyecto
- Certifications: ~150-300 caracteres por certificación

### Total Token Usage Estimates

| Resume Type | Prompt Tokens | Response Tokens | Total Tokens |
|------------|---------------|-----------------|--------------|
| Entry Level | 875-1,250 | 750-1,250 | **1,625-2,500** |
| Mid Level | 1,250-2,000 | 1,250-2,000 | **2,500-4,000** |
| Senior/Executive | 2,000-3,750 | 2,000-3,000 | **4,000-6,750** |

**Average across all resumes:** ~3,000-4,000 tokens per generation

## 💰 Cost Calculation

### Provider Pricing (as of 2024-2025)

**OpenAI GPT-4 Turbo:**
- Input: $10.00 per 1M tokens
- Output: $30.00 per 1M tokens

**OpenAI GPT-4 (standard):**
- Input: $30.00 per 1M tokens
- Output: $60.00 per 1M tokens

**Groq GPT OSS 20B 128k:**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

### Cost Comparison Table

Using average token usage: **3,500 tokens** (2,000 input + 1,500 output tokens)

| Model | Input Cost per 1M | Output Cost per 1M | Cost per Resume | Monthly (1K resumes) | Monthly (10K resumes) |
|-------|------------------|-------------------|-----------------|---------------------|----------------------|
| **OpenAI GPT-4 Turbo** | $10.00 | $30.00 | **$0.065** | **$65** | **$650** |
| **OpenAI GPT-4** | $30.00 | $60.00 | **$0.15** | **$150** | **$1,500** |
| **Groq GPT OSS 20B** | $0.075 | $0.30 | **$0.0005** | **$0.50** | **$5** |

### Detailed Cost Breakdown

#### OpenAI GPT-4 Turbo (2,000 input + 1,500 output tokens)
- Input cost: (2,000 / 1,000,000) × $10.00 = **$0.02**
- Output cost: (1,500 / 1,000,000) × $30.00 = **$0.045**
- **Total: $0.065 per resume generation**

#### OpenAI GPT-4 Standard (2,000 input + 1,500 output tokens)
- Input cost: (2,000 / 1,000,000) × $30.00 = **$0.06**
- Output cost: (1,500 / 1,000,000) × $60.00 = **$0.09**
- **Total: $0.15 per resume generation**

#### Groq GPT OSS 20B 128k (2,000 input + 1,500 output tokens)
- Input cost: (2,000 / 1,000,000) × $0.075 = **$0.00015**
- Output cost: (1,500 / 1,000,000) × $0.30 = **$0.00045**
- **Total: $0.0006 per resume generation**

### Cost Comparison by Resume Type

| Resume Type | Total Tokens | GPT-4 Turbo | GPT-4 | Groq 20B |
|------------|--------------|-------------|-------|----------|
| **Entry Level** | 2,000 | $0.05 | $0.12 | $0.0004 |
| **Mid Level** | 3,500 | $0.065 | $0.15 | $0.0006 |
| **Senior/Executive** | 5,500 | $0.10 | $0.24 | $0.0009 |

### Monthly Cost Estimates

**At 1,000 resume generations per month:**

| Model | Monthly Cost | Annual Cost | Cost Savings vs GPT-4 Turbo |
|-------|--------------|-------------|----------------------------|
| **Groq GPT OSS 20B** | **$0.60** | **$7.20** | **99.1% savings** |
| **OpenAI GPT-4 Turbo** | **$65** | **$780** | Baseline |
| **OpenAI GPT-4** | **$150** | **$1,800** | 2.3x more expensive |

**At 10,000 resume generations per month:**

| Model | Monthly Cost | Annual Cost | Cost Savings vs GPT-4 Turbo |
|-------|--------------|-------------|----------------------------|
| **Groq GPT OSS 20B** | **$6** | **$72** | **99.1% savings** |
| **OpenAI GPT-4 Turbo** | **$650** | **$7,800** | Baseline |
| **OpenAI GPT-4** | **$1,500** | **$18,000** | 2.3x more expensive |

### Key Insights

- **Groq offers 99%+ cost savings** compared to OpenAI GPT-4 Turbo
- Groq is **130x cheaper** than GPT-4 Turbo per resume generation
- At scale (10K+ resumes/month), Groq can save **$7,728+ annually** vs GPT-4 Turbo
- Groq pricing makes it viable for high-volume production use cases

## 🔧 Recommendations for Accurate Cost Tracking

### 1. Use Actual API Token Counts

Modify `parseAIResponse()` to use actual token counts from the API:

```typescript
// In callOpenAI(), return both content and usage
private async callOpenAI(...): Promise<{ content: string; usage: any }> {
  // ... existing code ...
  return { 
    content: data.choices[0]?.message?.content || '',
    usage: data.usage 
  };
}

// In parseAIResponse(), use actual usage
private parseAIResponse(response: string, usage: any, originalData: ResumeData): GeneratedResume {
  // ... existing parsing code ...
  parsed.metadata.tokensUsed = usage?.total_tokens || estimatedTokens;
  parsed.metadata.promptTokens = usage?.prompt_tokens;
  parsed.metadata.completionTokens = usage?.completion_tokens;
  return parsed;
}
```

### 2. Add Token Usage Logging

Log token usage to CloudWatch or a database for cost analysis:

```typescript
console.log('Token usage:', {
  userId,
  promptTokens: usage.prompt_tokens,
  completionTokens: usage.completion_tokens,
  totalTokens: usage.total_tokens,
  estimatedCost: calculateCost(usage, model)
});
```

### 3. Track Costs in Database

Store token usage per generation in DynamoDB for accurate cost tracking and reporting.

## 📈 Monitoring Production Costs

To monitor actual costs in production:

1. **Check CloudWatch Logs** - The `usage` object is already being logged
2. **Query logs** for `OpenAI API response details` to extract actual token counts
3. **Calculate average** token usage from real production data
4. **Update cost estimates** based on actual usage patterns

### Example Log Query

Search CloudWatch logs for:
```
"OpenAI API response details"
```

Extract the `usage` field to get actual token counts for cost analysis.

