import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export const HOST = process.env.HOST as string;
export const PORT = parseInt(process.env.PORT as string);

export const DB_URI = process.env.DB_URI as string;
export const CANDIDATE_URI = process.env.CANDIDATE_URI as string;

if (!HOST || !PORT) {
  console.error('No server configurations. Provide HOST and PORT environment variables.');
  process.exit(1);
}

if (!DB_URI) {
  console.error('No db configurations. Provide DB_URI environment variable.');
  process.exit(1);
}

if (!CANDIDATE_URI) {
  console.error('No candidate service configurations. Provide CANDIDATE_URI environment variable.');
  process.exit(1);
}
