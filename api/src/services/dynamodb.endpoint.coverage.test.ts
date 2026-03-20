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
  class QueryCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  class UpdateCommand {
    constructor(public input: unknown) {}
  }
  class GetCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: {
      from: () => ({ send: sendMock }),
    },
    QueryCommand,
    PutCommand,
    UpdateCommand,
    GetCommand,
  };
});

import { getUserByEmail } from './dynamodb';

describe('dynamodb module with DYNAMODB_ENDPOINT', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('executes query against configured client', async () => {
    sendMock.mockResolvedValueOnce({ Items: [] });
    await expect(getUserByEmail('nobody@example.com')).resolves.toBeNull();
  });
});
