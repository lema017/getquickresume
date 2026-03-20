import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const getAIConfigForUser = vi.hoisted(() => vi.fn());
const trackAIUsage = vi.hoisted(() => vi.fn());
const fetchMock = vi.hoisted(() => vi.fn());

vi.mock('../utils/aiProviderSelector', () => ({ getAIConfigForUser }));
vi.mock('./aiUsageService', () => ({
  trackAIUsage: (...a: unknown[]) => trackAIUsage(...a),
}));

import { keywordAnalyzerService } from './keywordAnalyzerService';

const jsonContent = JSON.stringify({
  hardSkills: ['Python', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'],
  softSkills: ['Leadership', 'Communication'],
  actionVerbs: ['Led', 'Built', 'Shipped', 'Scaled', 'Owned'],
  industryTerms: ['SaaS', 'CI/CD', 'Microservices', 'Agile', 'DevOps', 'API', 'Cloud', 'ETL'],
});

describe('keywordAnalyzerService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
    trackAIUsage.mockReset();
    trackAIUsage.mockResolvedValue(undefined);
    getAIConfigForUser.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('analyzeKeywords Groq path with userId tracks usage', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'llama' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: jsonContent } }],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 5,
          total_tokens: 10,
          prompt_tokens_details: { cached_tokens: 1 },
        },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r1',
      profession: 'Engineer',
      resumeText: 'Python AWS Docker Kubernetes leadership led built shipped',
      userId: 'u1',
      isPremium: true,
    });
    expect(a.totalKeywordsFound).toBeGreaterThan(10);
    expect(trackAIUsage).toHaveBeenCalled();
  });

  it('analyzeKeywords OpenAI path', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o-mini' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: `\`\`\`json\n${jsonContent}\n\`\`\`` } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r2',
      profession: 'PM',
      resumeText: 'long enough resume text '.repeat(30),
      isPremium: false,
    });
    expect(a.keywords.hardSkills.length).toBeGreaterThan(0);
  });

  it('analyzeKeywords Anthropic path', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'anthropic', model: 'claude' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [{ text: jsonContent }],
        usage: { input_tokens: 3, output_tokens: 4 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r3',
      profession: 'Designer',
      resumeText: 'content '.repeat(40),
    });
    expect(a.totalKeywordsFound).toBeGreaterThan(0);
  });

  it('analyzeKeywords returns default analysis on AI failure', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockRejectedValue(new Error('network'));
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r4',
      profession: 'X',
      resumeText: 'y '.repeat(50),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('analyzeKeywords maps needs-work tier', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    const small = JSON.stringify({
      hardSkills: ['a'],
      softSkills: [],
      actionVerbs: [],
      industryTerms: [],
    });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: small } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-tier',
      profession: 'X',
      resumeText: 'short '.repeat(20),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('analyzeKeywords ignores trackAIUsage rejection', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    trackAIUsage.mockRejectedValueOnce(new Error('usage'));
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: jsonContent } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-track-fail',
      profession: 'Dev',
      resumeText: 'word '.repeat(30),
      userId: 'u1',
      isPremium: false,
    });
    expect(a.totalKeywordsFound).toBeGreaterThan(0);
  });

  it('Groq HTTP error with JSON body', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many',
      text: async () => JSON.stringify({ error: { message: 'Rate limit' } }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-groq-err',
      profession: 'X',
      resumeText: 'y '.repeat(40),
    });
    expect(a.tierLabel).toContain('Unable');
  });

  it('Groq HTTP error with non-JSON body', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Err',
      text: async () => 'not json {',
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-groq-plain',
      profession: 'X',
      resumeText: 'z '.repeat(40),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('OpenAI HTTP error falls back to default analysis', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o-mini' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'oops',
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-oai-err',
      profession: 'X',
      resumeText: 't '.repeat(40),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('Anthropic HTTP error falls back to default analysis', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'anthropic', model: 'claude' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => 'denied',
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-ant-err',
      profession: 'X',
      resumeText: 't '.repeat(40),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('parse failure returns default analysis', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'not valid json {{{' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-bad-parse',
      profession: 'X',
      resumeText: 'p '.repeat(40),
    });
    expect(a.breakdown).toContain('failed');
  });

  it('maps fair and good tiers by keyword count', async () => {
    // sanitizeArray drops strings shorter than 2 chars — use length-2 tokens so counts match tiers.
    const fair = JSON.stringify({
      hardSkills: ['aa', 'bb', 'cc'],
      softSkills: ['dd', 'ee'],
      actionVerbs: ['ff', 'gg'],
      industryTerms: ['hh'],
    });
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: fair } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const f = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-fair',
      profession: 'X',
      resumeText: 'text '.repeat(25),
    });
    expect(f.atsScore).toBe('fair');

    const good = JSON.stringify({
      hardSkills: ['a1', 'a2', 'a3', 'a4', 'a5'],
      softSkills: ['b1', 'b2', 'b3', 'b4', 'b5'],
      actionVerbs: ['c1', 'c2', 'c3'],
      industryTerms: ['d1', 'd2'],
    });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: good } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const g = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-good',
      profession: 'X',
      resumeText: 'text '.repeat(25),
    });
    expect(g.atsScore).toBe('good');
  });

  it('clearCache removes entries for resume', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: jsonContent } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-clear',
      profession: 'P',
      resumeText: 'x '.repeat(30),
    });
    keywordAnalyzerService.clearCache('r-clear');
    await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-clear',
      profession: 'P',
      resumeText: 'x '.repeat(30),
    });
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('cache returns same analysis for repeat calls', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: jsonContent } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const params = {
      resumeId: 'r-cache',
      profession: 'Dev',
      resumeText: 'text '.repeat(30),
    };
    const first = await keywordAnalyzerService.analyzeKeywords(params);
    const second = await keywordAnalyzerService.analyzeKeywords(params);
    expect(second.totalKeywordsFound).toBe(first.totalKeywordsFound);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('maps excellent tier with 25+ sanitized keywords', async () => {
    const keys = Array.from({ length: 26 }, (_, i) => `k${i}`.padEnd(2, 'x'));
    const excellent = JSON.stringify({
      hardSkills: keys.slice(0, 10),
      softSkills: keys.slice(10, 16),
      actionVerbs: keys.slice(16, 22),
      industryTerms: keys.slice(22, 26),
    });
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: excellent } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-exc',
      profession: 'X',
      resumeText: 'w '.repeat(40),
    });
    expect(a.atsScore).toBe('excellent');
  });

  it('treats non-array category fields as empty', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'groq', model: 'm' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                hardSkills: 'nope',
                softSkills: null,
                actionVerbs: {},
                industryTerms: ['zz'],
              }),
            },
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-shape',
      profession: 'X',
      resumeText: 'w '.repeat(40),
    });
    expect(a.totalKeywordsFound).toBe(1);
  });

  it('OpenAI empty message content yields default analysis', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'openai', model: 'gpt-4o-mini' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '' } }],
        usage: { prompt_tokens: 1, completion_tokens: 0, total_tokens: 1 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-oai-empty',
      profession: 'X',
      resumeText: 't '.repeat(40),
    });
    expect(a.atsScore).toBe('needs-work');
  });

  it('Anthropic empty text yields default analysis', async () => {
    getAIConfigForUser.mockReturnValue({ provider: 'anthropic', model: 'claude' });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [{ text: '' }],
        usage: { input_tokens: 1, output_tokens: 0 },
      }),
    });
    const a = await keywordAnalyzerService.analyzeKeywords({
      resumeId: 'r-ant-empty',
      profession: 'X',
      resumeText: 't '.repeat(40),
    });
    expect(a.atsScore).toBe('needs-work');
  });
});
