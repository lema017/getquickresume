import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class PutCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  class QueryCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: sendMock }) },
    PutCommand,
    UpdateCommand,
    QueryCommand,
  };
});

import {
  calculateCost,
  logAIUsage,
  updateUserAggregates,
  updateResumeAICost,
  trackAIUsage,
  getUserAIUsageLogs,
  getResumeAIUsageLogs,
  type AIEndpointType,
} from './aiUsageService';

const usage = { promptTokens: 10, completionTokens: 5, totalTokens: 15 };

describe('aiUsageService coverage', () => {
  beforeEach(() => sendMock.mockReset());

  it('calculateCost unknown provider and model fallbacks', () => {
    expect(calculateCost('groq', 'totally-unknown-model-xyz', usage)).toBeGreaterThanOrEqual(0);
    expect(calculateCost('not-a-provider' as 'groq', 'm', usage)).toBeGreaterThanOrEqual(0);
  });

  it('logAIUsage success', async () => {
    sendMock.mockResolvedValueOnce({});
    const log = await logAIUsage({
      userId: 'u1',
      endpoint: 'enhanceText',
      provider: 'groq',
      model: 'llama',
      usage,
      isPremium: true,
    });
    expect(log.userId).toBe('u1');
  });

  it('logAIUsage swallows dynamo error', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    const log = await logAIUsage({
      userId: 'u1',
      endpoint: 'enhanceText',
      provider: 'openai',
      model: 'gpt-4o',
      usage,
      isPremium: false,
    });
    expect(log.id).toMatch(/^ailog_/);
  });

  it('updateUserAggregates happy path', async () => {
    sendMock.mockResolvedValueOnce({});
    await updateUserAggregates('u1', usage, 0.001);
  });

  it('updateUserAggregates initializes on ValidationException', async () => {
    sendMock
      .mockRejectedValueOnce(Object.assign(new Error('bad path'), { name: 'ValidationException' }))
      .mockResolvedValueOnce({});
    await updateUserAggregates('u1', usage, 0.002);
  });

  it('updateUserAggregates initializes on ConditionalCheckFailedException', async () => {
    sendMock
      .mockRejectedValueOnce(
        Object.assign(new Error('cond'), { name: 'ConditionalCheckFailedException' })
      )
      .mockResolvedValueOnce({});
    await updateUserAggregates('u1', usage, 0.0025);
  });

  it('updateUserAggregates initializes on document path message', async () => {
    sendMock
      .mockRejectedValueOnce(new Error('document path invalid'))
      .mockResolvedValueOnce({});
    await updateUserAggregates('u1', usage, 0.003);
  });

  it('updateUserAggregates init failure logs', async () => {
    sendMock.mockRejectedValueOnce(new Error('document path')).mockRejectedValueOnce(new Error('x'));
    await updateUserAggregates('u1', usage, 0.004);
  });

  it('updateUserAggregates other error logs', async () => {
    sendMock.mockRejectedValueOnce(new Error('other failure'));
    await updateUserAggregates('u1', usage, 0.005);
  });

  async function resumeCostFirstFailThenInit(endpoint: AIEndpointType) {
    sendMock
      .mockRejectedValueOnce(Object.assign(new Error('no aiCost'), { name: 'ConditionalCheckFailedException' }))
      .mockResolvedValueOnce({});
    await updateResumeAICost('u1', 'r1', usage, 0.01, endpoint);
  }

  it('updateResumeAICost updates existing', async () => {
    sendMock.mockResolvedValueOnce({});
    await updateResumeAICost('u1', 'r1', usage, 0.02, 'generateResume');
  });

  it('updateResumeAICost covers breakdown categories', async () => {
    const endpoints: AIEndpointType[] = [
      'scoreResume',
      'achievementSuggestions',
      'enhanceText',
      'linkedInParsing',
      'translateResume',
      'publicAtsCheck',
      'jobAnalysis',
      'resumeExtraction',
      'validate-section',
      'autoEnhanceSection',
    ];
    for (const ep of endpoints) {
      sendMock.mockReset();
      await resumeCostFirstFailThenInit(ep);
    }
  });

  it('updateResumeAICost init failure', async () => {
    sendMock
      .mockRejectedValueOnce(Object.assign(new Error('x'), { name: 'ConditionalCheckFailedException' }))
      .mockRejectedValueOnce(new Error('init fail'));
    await updateResumeAICost('u1', 'r1', usage, 0.01, 'generateResume');
  });

  it('updateResumeAICost unrelated error', async () => {
    sendMock.mockRejectedValueOnce(new Error('network'));
    await updateResumeAICost('u1', 'r1', usage, 0.01, 'generateResume');
  });

  it('updateResumeAICost default breakdown via keywordAnalysis', async () => {
    await resumeCostFirstFailThenInit('keywordAnalysis');
  });

  it('trackAIUsage with resumeId', async () => {
    sendMock.mockResolvedValue({});
    await trackAIUsage({
      userId: 'u1',
      resumeId: 'r1',
      endpoint: 'enhanceText',
      provider: 'groq',
      model: 'x',
      usage,
      isPremium: true,
    });
    expect(sendMock).toHaveBeenCalled();
  });

  it('trackAIUsage without resumeId', async () => {
    sendMock.mockResolvedValue({});
    await trackAIUsage({
      userId: 'u1',
      endpoint: 'enhanceText',
      provider: 'groq',
      model: 'x',
      usage,
      isPremium: false,
    });
  });

  it('getUserAIUsageLogs', async () => {
    sendMock.mockResolvedValueOnce({ Items: [{ id: '1' }] });
    expect(await getUserAIUsageLogs('u1', 5)).toHaveLength(1);
  });

  it('getUserAIUsageLogs error returns []', async () => {
    sendMock.mockRejectedValueOnce(new Error('q'));
    expect(await getUserAIUsageLogs('u1')).toEqual([]);
  });

  it('getResumeAIUsageLogs', async () => {
    sendMock.mockResolvedValueOnce({ Items: [] });
    expect(await getResumeAIUsageLogs('r1')).toEqual([]);
  });

  it('getResumeAIUsageLogs error returns []', async () => {
    sendMock.mockRejectedValueOnce(new Error('q'));
    expect(await getResumeAIUsageLogs('r1')).toEqual([]);
  });
});
