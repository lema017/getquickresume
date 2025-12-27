import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export type SupportTicketType = 'help' | 'complaint' | 'comment' | 'feature';
export type SupportTicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export interface SupportTicket {
  ticketId: string;
  userId: string;
  type: SupportTicketType;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
}

// Configuración para desarrollo local y producción
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  // Para desarrollo local, usar endpoint local
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local'
    }
  })
});

const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.SUPPORT_TICKETS_TABLE || 'getquickresume-api-support-tickets-dev';

export const createSupportTicket = async (
  userId: string,
  type: SupportTicketType,
  subject: string,
  message: string
): Promise<SupportTicket> => {
  try {
    const now = new Date().toISOString();
    const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const ticket: SupportTicket = {
      ticketId,
      userId,
      type,
      subject,
      message,
      status: 'open',
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: ticket,
    });

    await dynamodb.send(command);
    return ticket;
  } catch (error) {
    console.error('Error creating support ticket:', error);
    throw new Error('Database error');
  }
};

export const getTicketsByUserId = async (userId: string): Promise<SupportTicket[]> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ScanIndexForward: false, // Sort by createdAt descending
    });

    const result = await dynamodb.send(command);
    return (result.Items || []) as SupportTicket[];
  } catch (error) {
    console.error('Error getting tickets by user:', error);
    throw new Error('Database error');
  }
};

export const getTicketById = async (ticketId: string): Promise<SupportTicket | null> => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: {
        ticketId,
      },
    });

    const result = await dynamodb.send(command);
    return (result.Item as SupportTicket) || null;
  } catch (error) {
    console.error('Error getting ticket by id:', error);
    throw new Error('Database error');
  }
};

