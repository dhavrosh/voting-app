import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;

export const RHOST = process.env.RHOST;
export const RLIST_NAME = process.env.RLIST_NAME as string;

if (!HOST || !PORT) {
  console.error('No server configurations. Provide HOST and PORT environment variables.');
  process.exit(1);
}

if (!RHOST || !RLIST_NAME) {
  console.error('No redis configurations. Provide RHOST and RLIST_NAME environment variables.');
  process.exit(1);
}