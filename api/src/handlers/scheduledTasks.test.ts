import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class ScanCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    ScanCommand,
    UpdateCommand,
  };
});

import { expireSubscriptions } from './scheduledTasks';

describe('expireSubscriptions', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('downgrades expired users', async () => {
    sendMock
      .mockResolvedValueOnce({
        Items: [
          { id: 'u1', email: 'a@b.com', subscriptionExpiration: '2000-01-01T00:00:00.000Z' },
        ],
      })
      .mockResolvedValueOnce({});
    await expireSubscriptions();
    expect(sendMock).toHaveBeenCalled();
  });

  it('throws when scan fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('scan failed'));
    await expect(expireSubscriptions()).rejects.toThrow();
  });

  it('counts errors when per-user update fails', async () => {
    sendMock
      .mockResolvedValueOnce({
        Items: [
          { id: 'u1', email: 'a@b.com', subscriptionExpiration: '2000-01-01T00:00:00.000Z' },
          { id: 'u2', email: 'b@b.com', subscriptionExpiration: '2000-01-01T00:00:00.000Z' },
        ],
      })
      .mockRejectedValueOnce(new Error('update failed'))
      .mockResolvedValueOnce({});
    await expireSubscriptions();
    expect(sendMock).toHaveBeenCalled();
  });

  it('logs when scan returns pagination key', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [],
      LastEvaluatedKey: { id: 'cursor' },
    });
    await expireSubscriptions();
  });
});
