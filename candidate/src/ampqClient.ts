import {
  RABBITMQ_URI,
  EXCHANGE_NAME,
  CANDIDATE_AMPQ_KEY
} from './secrets';
import { getAll } from './api/controller';
import { AmqpClient } from '../../common/service';

export const init = async () => {
  const amqpClient = await new AmqpClient(RABBITMQ_URI, EXCHANGE_NAME).init();

  amqpClient.consume(undefined, [CANDIDATE_AMPQ_KEY], async (msg) => {
    const data = await getAll();
    const jsonData = JSON.stringify(data);

    const { replyTo, correlationId } = msg.properties;

    amqpClient.produce(replyTo, jsonData, { correlationId });
  });
};