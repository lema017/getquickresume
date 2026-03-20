import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const createSupportTicket = vi.hoisted(() => vi.fn());
const getTicketsByUserId = vi.hoisted(() => vi.fn());
const getTicketById = vi.hoisted(() => vi.fn());

vi.mock('../services/supportService', () => ({
  createSupportTicket,
  getTicketsByUserId,
  getTicketById,
}));

import {
  createSupportTicketHandler,
  listUserTicketsHandler,
  getTicketHandler,
} from './support';

describe('support handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createSupportTicketHandler', () => {
    it('401 without authorizer', async () => {
      const ev = makeAuthorizedEvent();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      expect((await createSupportTicketHandler(ev)).statusCode).toBe(401);
    });

    it('400 no body', async () => {
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({ httpMethod: 'POST', body: null })
      );
      expect(res.statusCode).toBe(400);
    });

    it('400 bad type', async () => {
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ type: 'x', subject: 's', message: 'm' }),
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('400 empty subject', async () => {
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ type: 'help', subject: '  ', message: 'm' }),
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('400 empty message', async () => {
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ type: 'help', subject: 's', message: '' }),
        })
      );
      expect(res.statusCode).toBe(400);
    });

    it('201 created', async () => {
      createSupportTicket.mockResolvedValueOnce({ id: 't1' });
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ type: 'feature', subject: 's', message: 'm' }),
        })
      );
      expect(res.statusCode).toBe(201);
    });

    it('500 on throw', async () => {
      createSupportTicket.mockRejectedValueOnce(new Error('db'));
      const res = await createSupportTicketHandler(
        makeAuthorizedEvent({
          httpMethod: 'POST',
          body: JSON.stringify({ type: 'help', subject: 's', message: 'm' }),
        })
      );
      expect(res.statusCode).toBe(500);
    });
  });

  describe('listUserTicketsHandler', () => {
    it('401', async () => {
      const ev = makeAuthorizedEvent();
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      expect((await listUserTicketsHandler(ev)).statusCode).toBe(401);
    });

    it('200', async () => {
      getTicketsByUserId.mockResolvedValueOnce([]);
      expect((await listUserTicketsHandler(makeAuthorizedEvent())).statusCode).toBe(200);
    });

    it('500', async () => {
      getTicketsByUserId.mockRejectedValueOnce(new Error('x'));
      expect((await listUserTicketsHandler(makeAuthorizedEvent())).statusCode).toBe(500);
    });
  });

  describe('getTicketHandler', () => {
    it('401', async () => {
      const ev = makeAuthorizedEvent({ pathParameters: { ticketId: '1' } });
      (ev as { requestContext: { authorizer?: unknown } }).requestContext.authorizer = undefined;
      expect((await getTicketHandler(ev)).statusCode).toBe(401);
    });

    it('400 no ticket id', async () => {
      const res = await getTicketHandler(
        makeAuthorizedEvent({ pathParameters: null })
      );
      expect(res.statusCode).toBe(400);
    });

    it('404', async () => {
      getTicketById.mockResolvedValueOnce(null);
      const res = await getTicketHandler(
        makeAuthorizedEvent({ pathParameters: { ticketId: 'x' } })
      );
      expect(res.statusCode).toBe(404);
    });

    it('403 wrong user', async () => {
      getTicketById.mockResolvedValueOnce({ userId: 'other' });
      const res = await getTicketHandler(
        makeAuthorizedEvent({ pathParameters: { ticketId: 'x' } })
      );
      expect(res.statusCode).toBe(403);
    });

    it('200', async () => {
      getTicketById.mockResolvedValueOnce({
        userId: 'user_test_1',
        id: 'x',
      });
      const res = await getTicketHandler(
        makeAuthorizedEvent({ pathParameters: { ticketId: 'x' } })
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
