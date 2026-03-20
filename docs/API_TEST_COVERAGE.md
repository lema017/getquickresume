# GetQuickResume API — automated tests and coverage

This document describes **what the API unit tests cover today**, how **security and rate limiting** are validated, and **how to run tests** locally or in CI.

## Where tests live

- **Runner**: [Vitest](https://vitest.dev/) in the `api` package ([api/vitest.config.ts](../api/vitest.config.ts)).
- **Test files**: `api/src/**/*.test.ts` (next to or under the same `src` tree as handlers).
- **Shared helpers**: [api/src/test-utils/apiGateway.ts](../api/src/test-utils/apiGateway.ts) — builds minimal `APIGatewayProxyEvent` / authorizer context and sets a fixed `JWT_SECRET` for JWT-related tests.

Production **TypeScript build** (`npm run build` in `api`) runs **`tsc` then `vitest run --coverage`**, so compile, tests, and **coverage thresholds** must pass.

## Coverage scope (broad)

Coverage is collected on **all production code** under:

- `api/src/handlers/**/*.ts`
- `api/src/middleware/**/*.ts`
- `api/src/services/**/*.ts`
- `api/src/utils/**/*.ts`
- `api/src/types.ts`

Excluded from instrumentation (see [api/vitest.config.ts](../api/vitest.config.ts)): `**/*.test.ts`, `src/test-utils/**`, `dist/**`, `.build/**`, `src/types/node-fetch.d.ts`, etc.

**Note:** `types.ts` is almost entirely type-only declarations; V8 may show **0%** there even though types are “included” for completeness.

## Coverage thresholds (per file, enforced)

CI enforces **per-file** minimums via Vitest 3 (`perFile: true`) on globs defined in [api/vitest.config.ts](../api/vitest.config.ts):

| Glob | Policy |
|------|--------|
| `src/handlers/**/*.ts` | **80%** lines, statements, branches, and functions — **every** handler file must meet all four. |
| `src/services/!(aiService).ts` | Same **80%** on all four metrics for each service file **except** `aiService.ts` (picomatch negation). |
| `src/services/aiService.ts` | **Separate, lower tier** (currently 75% lines/statements, 25% branches, 93% functions) because the module is a large prompt/branch matrix; raising branch coverage there would mostly duplicate static prompt tests. |

There is **no** top-level aggregate threshold bucket; only the globs above gate the build. Middleware, utils, and `types.ts` are still **instrumented** for reporting but are not tied to per-file gates in that config.

### Coverage ignore pragmas (prompt-only code)

A few services wrap **large static prompt templates** or **pure text-shaping helpers** in `/* v8 ignore start */` … `/* v8 ignore stop */` so coverage reflects **tested orchestration and parsing** rather than counting every template literal branch. See [jobTailoringService.ts](../api/src/services/jobTailoringService.ts), [resumeExtractionService.ts](../api/src/services/resumeExtractionService.ts), and [resumeScoringService.ts](../api/src/services/resumeScoringService.ts). Runtime behavior is unchanged.

## How to run tests on demand

From the **repository root**:

```bash
npm run test:api
```

From **`api/`** (recommended for watch mode and coverage):

```bash
cd api
npm test                 # single run (vitest run)
npm run test:watch       # watch mode
npm run test:coverage    # run with V8 coverage report (text + html)
npm run type-check       # tsc --noEmit only
npm run build            # tsc + vitest run --coverage (enforces thresholds)
```

**Environment:** Tests do **not** call AWS, OpenAI, PayPal, or real OAuth providers. DynamoDB access in rate limiting is **mocked** (`vi.mock` on AWS SDK clients). For JWT tests, `setTestJwtEnv()` sets `JWT_SECRET` to a deterministic test value (see test utils).

## CI (GitHub Actions)

- **Workflow**: [.github/workflows/api-tests.yml](../.github/workflows/api-tests.yml) (workflow name: **Unit tests**).
- **Triggers**: **every push** to any branch, all **pull requests**, and **workflow_dispatch** (manual run in the Actions tab). Concurrent runs on the same branch cancel older runs.
- **Steps**: `npm ci` → `npm run type-check` → `npm run build` (compile + tests + coverage thresholds).
- **Notifications**: failed runs mark the commit red and add an error annotation; enable **GitHub → Settings → Notifications → Actions** (failed workflows) if you want email.

## Production deploy (tests gate deploy)

From the repo root, **prod deploy scripts run the full API CI suite first**, chained with `&&`. If **typecheck, any test, or coverage thresholds** fail, the process exits with a **non-zero status** and **nothing after that command runs** (no Serverless deploy, no S3 sync, no CloudFront invalidation).

| Script | What runs before deploy |
|--------|-------------------------|
| `npm run deploy:api` | `npm run test:api:ci` → same as `npm run build` in `api/` (`tsc` + `vitest run --coverage`) |
| `npm run deploy:frontend` | `npm run test:api:ci` first, then sitemap, `build:prod`, Serverless, sync, invalidation |

At the **repository root**, `npm run build` / `build:prod` runs Vite production build, then head-only SEO prerender for English and Spanish `/resume/*` and `/resume-skills/*` slugs (where translations exist), and **`node scripts/verify-prerender.mjs`** against `dist/seo-prerender-manifest.json` (use `SMOKE_ONLY=1` for a small random sample).

In **`api/`**, `npm run deploy:prod` and `npm run deploy` are **`npm run build && serverless deploy`** so local API deploys also stop on test or coverage failure.

**Do not** run `serverless deploy` alone for production if you want this guarantee—use the npm scripts above.

## How security is tested

| Layer | What we assert |
|--------|----------------|
| **Lambda authorizer** | [api/src/handlers/authorizer.test.ts](../api/src/handlers/authorizer.test.ts) calls `authorize()` with a real `APIGatewayTokenAuthorizerEvent`: missing/invalid token → **Deny**; valid JWT (issuer/audience/secret) → **Allow** + `context.userId` / `context.email`. |
| **Handlers after auth** | Handlers that check `event.requestContext.authorizer` get **401** when that context is stripped. Examples: [resume.test.ts](../api/src/handlers/resume.test.ts), [aiEnhance.test.ts](../api/src/handlers/aiEnhance.test.ts), [suggestions.test.ts](../api/src/handlers/suggestions.test.ts), [auth-oauth.test.ts](../api/src/handlers/auth-oauth.test.ts) (`getMe`). |

**Note:** API Gateway returns **403** when the authorizer returns **Deny**; the handler never runs. Authorizer tests cover the Lambda policy decision; handler tests cover behavior **given** a valid authorizer context.

## How rate limits are tested

| Layer | What we assert |
|--------|----------------|
| **DynamoDB-backed limiter** | [api/src/middleware/rateLimiter.test.ts](../api/src/middleware/rateLimiter.test.ts) mocks `DynamoDBDocumentClient.send`: first hit, increment, **at cap**, window reset, **fail-open** on DynamoDB errors, and **refundRateLimit** behavior. |
| **IP limiter** | [api/src/middleware/ipRateLimiter.test.ts](../api/src/middleware/ipRateLimiter.test.ts) covers `extractClientIp`, allow/deny paths, and Dynamo errors (fail-open). |
| **Utils rate limit** | [api/src/utils/rateLimiter.test.ts](../api/src/utils/rateLimiter.test.ts) |
| **Handler responses** | **429** where implemented: e.g. `generateResume`, `enhanceTextWithAI`, job tailoring, suggestions, templates. |

## Maintenance

When you add or change an API behavior:

1. Add or update tests under `api/src/**/*.test.ts`.
2. Ensure `cd api && npm run build` passes (includes coverage thresholds).
3. When adding handlers or services, keep **per-file** thresholds green; adjust tests (or, sparingly, narrow `v8 ignore` regions) rather than lowering gates without discussion.

## Test file index (representative)

| Area | Test files |
|------|------------|
| Auth / JWT / authorizer | `auth-oauth.test.ts`, `authorizer.test.ts`, `jwt.test.ts` |
| Resume / templates / suggestions / AI enhance | `resume.test.ts`, `templates.test.ts`, `suggestions.test.ts`, `aiEnhance.test.ts` |
| Job tailoring | `jobTailoring.test.ts`, `jobTailoring.coverage.test.ts` |
| Middleware | `rateLimiter.test.ts`, `ipRateLimiter.test.ts` |
| Services (broad) | `dynamodb.test.ts`, `aiService.coverage.test.ts`, `analyticsService.coverage.test.ts`, `linkedinAuth.coverage.test.ts`, `paypalService.coverage.test.ts`, `emailService.coverage.test.ts`, `translationService.coverage.test.ts`, `resumeScoringService.coverage.test.ts`, `keywordAnalyzerService.coverage.test.ts`, `suggestionService.coverage.test.ts`, `jobTailoringService.coverage.test.ts`, `resumeExtractionService.coverage.test.ts`, `contentValidatorService.coverage.test.ts`, `deterministicScoringService.coverage.test.ts`, `aiUsageService.cost.test.ts`, … |
| Utils | `utils.coverage.test.ts`, `resumeVerifiers.coverage.test.ts`, `rateLimiter.test.ts` |
| Handlers | `scheduledTasks.test.ts`, `coverLetter.coverage.test.ts`, `resumeSharing.coverage.test.ts`, `aiEnhancementQuestions.coverage.test.ts`, `aiDirectEnhancement.coverage.test.ts`, `aiSectionImprovement.coverage.test.ts`, … |

The **authoritative route list** is [api/serverless.yml](../api/serverless.yml).
