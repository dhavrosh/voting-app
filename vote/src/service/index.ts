import { ApiLogger } from './logger';
import { CANDIDATE_URI } from '../secrets';
import {
  RedisClient,
  RedisNativeClient,
  createRequester,
} from '../../../common/service';

const logger = ApiLogger.newInstance();

const redis = new RedisClient(logger);

const requester = createRequester(CANDIDATE_URI);

export { logger, redis, requester, RedisNativeClient };
