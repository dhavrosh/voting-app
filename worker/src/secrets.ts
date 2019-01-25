import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;

export const DB_URI = process.env.DB_URI as string;

export const RABBITMQ_URI = process.env.RABBITMQ_URI as string;
export const EXCHANGE_NAME = process.env.EXCHANGE_NAME as string;
export const VOTE_AMPQ_KEY = process.env.VOTE_AMPQ_KEY as string;

if (!HOST || !PORT) {
  console.error('No server configurations. Provide HOST and PORT environment variables.');
  process.exit(1);
}

if (!DB_URI) {
  console.error('No db configurations. Provide DB_URI environment variable.');
  process.exit(1);
}


if (!RABBITMQ_URI || !EXCHANGE_NAME || !VOTE_AMPQ_KEY) {
  console.error('No rabbitmq configurations. Provide all rabbitmq environment variables.');
  process.exit(1);
}
