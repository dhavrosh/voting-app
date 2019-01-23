import { ApiLogger } from './logger';
import { RedisClient, RedisNativeClient } from '../../../common/service';

const logger = ApiLogger.newInstance();

const redis = new RedisClient(logger);

export { logger, redis, RedisNativeClient };
