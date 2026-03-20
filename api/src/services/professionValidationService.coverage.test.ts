import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class GetCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: sendMock }) },
    GetCommand,
    PutCommand,
  };
});

import {
  normalizeKey,
  isValidProfessionCached,
  cacheValidProfession,
} from './professionValidationService';

describe('professionValidationService', () => {
  beforeEach(() => sendMock.mockReset());

  it('normalizeKey', () => {
    expect(normalizeKey('  Ab C  ')).toBe('ab c');
  });

  it('cache hit', async () => {
    sendMock.mockResolvedValueOnce({ Item: { professionKey: 'x', originalProfession: 'X' } });
    expect(await isValidProfessionCached('X')).toBe(true);
  });

  it('cache miss', async () => {
    sendMock.mockResolvedValueOnce({});
    expect(await isValidProfessionCached('Y')).toBe(false);
  });

  it('cache get error returns false', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    expect(await isValidProfessionCached('Z')).toBe(false);
  });

  it('cacheValidProfession success', async () => {
    sendMock.mockResolvedValueOnce({});
    await cacheValidProfession('  Nurse  ');
    expect(sendMock).toHaveBeenCalled();
  });

  it('cacheValidProfession swallows error', async () => {
    sendMock.mockRejectedValueOnce(new Error('put'));
    await cacheValidProfession('Dev');
  });
});
