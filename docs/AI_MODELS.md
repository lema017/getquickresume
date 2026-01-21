# AI Models Usage Documentation

This document provides a comprehensive overview of all AI-powered APIs in the GetQuickResume application, including which AI provider and model is used for each endpoint based on user type.

## Model Selection Logic

The application uses a **unified model selection system** based on user premium status and environment configuration. **All endpoints** now use the same model selection logic via `getAIConfigForUser(isPremium)`.

### Free Users
- **Provider**: Groq
- **Model**: `openai/gpt-oss-20b`
- **Applies to**: ALL endpoints (no exceptions)

### Premium Users (Default - `PREMIUM_AI_PROVIDER=openai`)
- **Provider**: OpenAI
- **Model**: `gpt-4o` (or value from `AI_MODEL` env var)

### Premium Users (Groq Mode - `PREMIUM_AI_PROVIDER=groq`)
- **Provider**: Groq
- **Model**: `llama-3.3-70b-versatile`

## Implementation Details

The model selection is handled by the `getAIConfigForUser(isPremium)` function in `api/src/utils/aiProviderSelector.ts`:

```typescript
export function getAIConfigForUser(isPremium: boolean): AIModelConfig {
  // Free users always use Groq with the free model
  if (!isPremium) {
    return { 
      provider: 'groq', 
      model: GROQ_FREE_MODEL  // 'openai/gpt-oss-20b'
    };
  }
  
  // Premium users: check the feature flag
  if (PREMIUM_PROVIDER === 'groq') {
    return { 
      provider: 'groq', 
      model: GROQ_PREMIUM_MODEL  // 'llama-3.3-70b-versatile'
    };
  }
  
  // Default: OpenAI for premium users
  return { 
    provider: 'openai', 
    model: OPENAI_DEFAULT_MODEL  // 'gpt-4o'
  };
}
```

## Complete AI APIs Table

| API Endpoint | AI Feature | Free Users | Premium (Default) | Premium (Groq Mode) | Notes |
|---|---|---|---|---|---|
| **Resume Generation & Improvements** |
| `POST /api/resume/generate` | Resume generation | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getAIConfigForUser()` |
| `POST /api/ai/enhance` | Text enhancement | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Free users limited by quota |
| `POST /api/ai/improve-section` | Improve section | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Free users limited by quota |
| `POST /api/ai/generate-enhancement-questions` | Enhancement questions | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only |
| `POST /api/ai/generate-answer-suggestion` | Answer suggestion | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only |
| `POST /api/ai/direct-enhance` | Direct mechanical fixes | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only |
| `POST /api/summary/suggestions` | Summary suggestions | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Free if quota not used |
| `POST /api/achievements/suggestions` | Achievement suggestions | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Free if quota not used |
| `GET /api/suggestions/{profession}` | Profession suggestions | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `aiService.generateProfessionSuggestions()` |
| **Resume Processing** |
| `POST /api/resume-extraction/extract` | Resume extraction | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getAIConfigForUser()` |
| `POST /api/resume/validate-section` | Section validation | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getAIConfigForUser()` |
| `POST /api/resumes/{id}/translate` | Resume translation | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only, uses `getAIConfigForUser()` |
| `POST /api/resumes/{id}/score` | Resume scoring | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only; both keyword analysis and content validation use `getAIConfigForUser()` |
| **Cover Letters** |
| `POST /api/cover-letters/generate` | Cover letter generation | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getAIConfigForUser()` |
| `POST /api/cover-letters/{id}/regenerate` | Regenerate paragraph | **Groq**<br>`openai/gpt-oss-20b` | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getAIConfigForUser()` |
| `POST /api/cover-letters/suggest-why-company` | AI suggestions | ❌ Not available | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`openai/gpt-oss-20b` | Premium only; fixed model |
| `POST /api/cover-letters/enhance-achievement` | Achievement enhancement | ❌ Not available | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`openai/gpt-oss-20b` | Premium only; fixed model |
| **LinkedIn Import** |
| `POST /api/linkedInData` | LinkedIn import parsing | ❌ Not available | **OpenAI**<br>`gpt-4o` | **Groq**<br>`llama-3.3-70b-versatile` | Premium only, uses `getAIConfigForUser()` |
| **Job Tailoring** |
| `POST /api/job-tailoring/validate-url` | Extract job from URL | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`llama-3.3-70b-versatile` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getGroqModelForUser()` |
| `POST /api/job-tailoring/analyze` | Analyze job posting | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`llama-3.3-70b-versatile` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getGroqModelForUser()` |
| `POST /api/job-tailoring/questions` | Generate questions | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`llama-3.3-70b-versatile` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getGroqModelForUser()` |
| `POST /api/job-tailoring/enhance-answer` | Enhance answers | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`llama-3.3-70b-versatile` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getGroqModelForUser()` |
| `POST /api/job-tailoring/generate` | Generate tailored resume | **Groq**<br>`openai/gpt-oss-20b` | **Groq**<br>`llama-3.3-70b-versatile` | **Groq**<br>`llama-3.3-70b-versatile` | Uses `getGroqModelForUser()` |

## Groq Models Used

The application uses the following Groq models:

1. **`openai/gpt-oss-20b`** (Groq Free Model)
   - Used for: **All free users on ALL endpoints**
   - Used for: Premium cover letter AI features (suggest-why-company, enhance-achievement)

2. **`llama-3.3-70b-versatile`** (Groq Premium Model)
   - Used for: Premium users when `PREMIUM_AI_PROVIDER=groq`
   - Used for: Premium users on job tailoring endpoints (always Groq)

## OpenAI Models Used

1. **`gpt-4o`** (Default OpenAI Model)
   - Used for: Premium users (default mode) on most endpoints
   - Can be overridden with `AI_MODEL` environment variable

## Special Cases

### Job Tailoring Service
The job tailoring service uses its own model selection function `getGroqModelForUser()` which:
- Always uses Groq (never OpenAI)
- Free users: `openai/gpt-oss-20b`
- Premium users: `llama-3.3-70b-versatile`

### Premium-Only Cover Letter Features
The premium-only cover letter features (suggest-why-company, enhance-achievement) use a fixed Groq model `openai/gpt-oss-20b` for all users since they are only available to premium users.

## Environment Variables

The following environment variables control AI model selection:

- `PREMIUM_AI_PROVIDER`: Set to `'groq'` to use Groq for premium users, or `'openai'` (default) for OpenAI
- `AI_MODEL`: Overrides the default OpenAI model (default: `'gpt-4o'`)
- `GROQ_API_KEY`: Required for Groq API calls
- `OPENAI_API_KEY`: Required for OpenAI API calls

## Code References

- Model selection logic: `api/src/utils/aiProviderSelector.ts`
- Main AI service: `api/src/services/aiService.ts`
- Job tailoring service: `api/src/services/jobTailoringService.ts`
- Translation service: `api/src/services/translationService.ts`
- Resume extraction service: `api/src/services/resumeExtractionService.ts`
- Keyword analyzer service: `api/src/services/keywordAnalyzerService.ts`
- Content validator service: `api/src/services/contentValidatorService.ts`
- Section validation handler: `api/src/handlers/validateSection.ts`
- Cover letter handler: `api/src/handlers/coverLetter.ts`
