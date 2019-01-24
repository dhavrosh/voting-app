import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export const ENVIRONMENT = process.env.NODE_ENV;
export const develop = ENVIRONMENT === 'development';
export const prod = ENVIRONMENT === 'production';

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const LOG_LEVEL = process.env.LOG_LEVEL;

export const RHOST = process.env.RHOST;
export const RLIST_NAME = process.env.RLIST_NAME as string;

export const CANDIDATE_URI = process.env.CANDIDATE_URI as string;

if (!HOST || !PORT) {
  console.error('No server configurations. Provide HOST and PORT environment variables.');
  process.exit(1);
}

if (!RHOST || !RLIST_NAME) {
  console.error('No redis configurations. Provide RHOST and RLIST_NAME environment variables.');
  process.exit(1);
}

if (!CANDIDATE_URI) {
  console.error('No candidate service configurations. Provide CANDIDATE_URI environment variable.');
  process.exit(1);
}
