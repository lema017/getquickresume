import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.hoisted(() => {
  process.env.DYNAMODB_ENDPOINT = 'http://127.0.0.1:8000';
});

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

describe('scheduledTasks with local DynamoDB endpoint', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('scan completes with no items', async () => {
    sendMock.mockResolvedValueOnce({ Items: [] });
    await expireSubscriptions();
  });
});
