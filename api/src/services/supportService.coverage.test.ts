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
  class QueryCommand {
    constructor(public input: unknown) {}
  }
  class GetCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: sendMock }) },
    PutCommand,
    QueryCommand,
    GetCommand,
  };
});

import { createSupportTicket, getTicketsByUserId, getTicketById } from './supportService';

describe('supportService', () => {
  beforeEach(() => sendMock.mockReset());

  it('createSupportTicket', async () => {
    sendMock.mockResolvedValueOnce({});
    const t = await createSupportTicket('u1', 'help', 's', 'm');
    expect(t.userId).toBe('u1');
    expect(t.status).toBe('open');
  });

  it('createSupportTicket throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(createSupportTicket('u1', 'help', 's', 'm')).rejects.toThrow('Database error');
  });

  it('getTicketsByUserId', async () => {
    sendMock.mockResolvedValueOnce({ Items: [{ ticketId: 't1' }] });
    expect(await getTicketsByUserId('u1')).toHaveLength(1);
  });

  it('getTicketsByUserId empty', async () => {
    sendMock.mockResolvedValueOnce({});
    expect(await getTicketsByUserId('u1')).toEqual([]);
  });

  it('getTicketsByUserId throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getTicketsByUserId('u1')).rejects.toThrow('Database error');
  });

  it('getTicketById', async () => {
    sendMock.mockResolvedValueOnce({ Item: { ticketId: 't1', userId: 'u1' } });
    expect(await getTicketById('t1')).toMatchObject({ ticketId: 't1' });
  });

  it('getTicketById null', async () => {
    sendMock.mockResolvedValueOnce({});
    expect(await getTicketById('t1')).toBeNull();
  });

  it('getTicketById throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getTicketById('t1')).rejects.toThrow('Database error');
  });
});
