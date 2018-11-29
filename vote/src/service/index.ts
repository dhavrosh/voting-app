import { ApiLogger } from './logger';
import { RedisClient } from './redis';

export const logger = ApiLogger.newInstance();

export const redis = new RedisClient(logger);
