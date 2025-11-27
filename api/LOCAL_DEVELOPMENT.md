

### Option 1: Automated Setup (Recommended)

```bash
# Install dependencies
npm install

# Start everything (DynamoDB + API)
./scripts/start-local.sh
```

This script will:
1. Start DynamoDB Local in Docker
2. Create the necessary tables
3. Start the API with Serverless Offline

### Option 2: Manual Setup

#### 1. Start DynamoDB Local

```bash
# Using Docker (recommended)
docker run -d \
  --name dynamodb-local \
  -p 8000:8000 \
  amazon/dynamodb-local \
  -jar DynamoDBLocal.jar -sharedDb -inMemory

# Or using DynamoDB Local JAR
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

#### 2. Create Tables

```bash
# Set environment variables
export DYNAMODB_ENDPOINT=http://localhost:8000
export STAGE=dev
export REGION=us-east-1
export DYNAMODB_TABLE=getquickresume-api-users-dev

# Create tables
npm run create-tables
```

#### 3. Start the API

```bash
# Start Serverless Offline
npm run dev

# Or with debug output
npm run offline:debug
```

## Available Scripts

- `npm run dev` - Start serverless offline (default)
- `npm run offline` - Start serverless offline with specific ports
- `npm run offline:debug` - Start with verbose logging
- `npm run create-tables` - Create DynamoDB tables
- `npm run build` - Build TypeScript
- `npm run deploy` - Deploy to AWS

## API Endpoints

Once running, your API will be available at:

- **API Gateway**: `http://localhost:3001`
- **Lambda Functions**: `http://localhost:3002`

### Available Endpoints

- `POST http://localhost:3001/api/auth/google` - Google OAuth
- `GET http://localhost:3001/api/auth/validate` - Token validation

## Environment Variables

The following environment variables are automatically set for local development:

- `STAGE=dev`
- `REGION=us-east-1`
- `DYNAMODB_ENDPOINT=http://localhost:8000`
- `DYNAMODB_TABLE=getquickresume-api-users-dev`

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:3000` (Frontend dev server)
- `http://localhost:3001` (API Gateway simulation)
- `http://localhost:3002` (Lambda simulation)

## Troubleshooting

### Port Conflicts
If ports 3001 or 3002 are in use, modify the ports in `serverless.yml`:

```yaml
custom:
  serverless-offline:
    httpPort: 3003  # Change this
    lambdaPort: 3004  # Change this
```

### DynamoDB Connection Issues
- Ensure DynamoDB Local is running on port 8000
- Check that the `DYNAMODB_ENDPOINT` environment variable is set
- Verify Docker is running if using the Docker method

### CORS Issues
- Ensure your frontend is running on `http://localhost:3000`
- Check that the frontend URL is in the `allowedOrigins` list in `serverless.yml`

### Table Creation Issues
- Make sure DynamoDB Local is running before creating tables
- Check the table name matches your environment variables
- Verify the table doesn't already exist (it's safe to run the script multiple times)

## Stopping the Services

### If using the automated script:
Press `Ctrl+C` to stop everything and clean up Docker containers.

### If running manually:
```bash
# Stop DynamoDB Local (Docker)
docker stop dynamodb-local
docker rm dynamodb-local

# Stop the API
# Press Ctrl+C in the terminal running npm run dev
```
 npm install -g dynamodb-admin
dynamodb-admin --dynamo-endpoint=http://localhost:8000