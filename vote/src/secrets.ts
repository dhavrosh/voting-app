import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export const ENVIRONMENT = process.env.NODE_ENV;
export const develop = ENVIRONMENT === 'development';
export const prod = ENVIRONMENT === 'production';

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const LOG_LEVEL = process.env.LOG_LEVEL;

export const RABBITMQ_URI = process.env.RABBITMQ_URI as string;
export const EXCHANGE_NAME = process.env.EXCHANGE_NAME as string;

export const CANDIDATE_AMPQ_KEY = process.env.CANDIDATE_AMPQ_KEY as string;
export const CANDIDATE_VOTE_AMPQ_KEY = process.env.CANDIDATE_VOTE_AMPQ_KEY as string;
export const VOTE_AMPQ_KEY = process.env.VOTE_AMPQ_KEY as string;

if (!HOST || !PORT) {
  console.error('No server configurations. Provide HOST and PORT environment variables.');
  process.exit(1);
}

if (
  !RABBITMQ_URI ||
  !EXCHANGE_NAME ||
  !VOTE_AMPQ_KEY ||
  !CANDIDATE_AMPQ_KEY ||
  !CANDIDATE_VOTE_AMPQ_KEY
) {
  console.error('No rabbitmq configurations. Provide all rabbitmq environment variables.');
  process.exit(1);
}
