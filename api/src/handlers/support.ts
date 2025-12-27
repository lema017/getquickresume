import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthorizedEvent } from '../types';
import { createSupportTicket, getTicketsByUserId, getTicketById, SupportTicketType } from '../services/supportService';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

export const createSupportTicketHandler = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Create Support Ticket request received');

  try {
    // Verificar que el evento tenga el contexto de autorización
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;

    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Request body is required'
        })
      };
    }

    const body = JSON.parse(event.body);
    const { type, subject, message } = body;

    // Validaciones
    if (!type || !['help', 'complaint', 'comment', 'feature'].includes(type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Invalid ticket type. Must be: help, complaint, comment, or feature'
        })
      };
    }

    if (!subject || subject.trim().length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Subject is required'
        })
      };
    }

    if (!message || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Message is required'
        })
      };
    }

    // Crear el ticket
    const ticket = await createSupportTicket(
      userId,
      type as SupportTicketType,
      subject.trim(),
      message.trim()
    );

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        data: ticket,
        message: 'Support ticket created successfully'
      })
    };
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export const listUserTicketsHandler = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('List User Tickets request received');

  try {
    // Verificar que el evento tenga el contexto de autorización
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;

    // Obtener los tickets del usuario
    const tickets = await getTicketsByUserId(userId);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        data: tickets,
        message: 'Tickets retrieved successfully'
      })
    };
  } catch (error) {
    console.error('Error listing user tickets:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export const getTicketHandler = async (
  event: APIGatewayProxyEvent & AuthorizedEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Get Ticket request received');

  try {
    // Verificar que el evento tenga el contexto de autorización
    if (!event.requestContext?.authorizer) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized: Missing authorization context'
        })
      };
    }

    const userId = event.requestContext.authorizer.userId;
    const ticketId = event.pathParameters?.ticketId;

    if (!ticketId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Ticket ID is required'
        })
      };
    }

    // Obtener el ticket
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Ticket not found'
        })
      };
    }

    // Verificar que el ticket pertenece al usuario
    if (ticket.userId !== userId) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Forbidden: You do not have access to this ticket'
        })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        data: ticket,
        message: 'Ticket retrieved successfully'
      })
    };
  } catch (error) {
    console.error('Error getting ticket:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

