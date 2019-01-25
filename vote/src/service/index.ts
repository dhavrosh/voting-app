import { ApiLogger } from './logger';
import { RABBITMQ_URI, EXCHANGE_NAME } from '../secrets';
import { AmqpClient } from '../../../common/service';

const logger = ApiLogger.newInstance();

const ampqClient = new AmqpClient(RABBITMQ_URI, EXCHANGE_NAME);

export { logger, ampqClient, AmqpClient };
