import {
  RABBITMQ_URI,
  EXCHANGE_NAME,
  CANDIDATE_AMPQ_KEY
} from './secrets';
import { getAll } from './api/controller';
import { AmqpClient } from '../../common/service';

const messageInterval = 5000;

export const init = async () => {
  const amqpClient = await new AmqpClient(RABBITMQ_URI, EXCHANGE_NAME).init();

  const sendCandidates = async () => {
    const data = await getAll();
    const jsonData = JSON.stringify(data);

    amqpClient.produce(CANDIDATE_AMPQ_KEY, jsonData);
  }

  setInterval(sendCandidates, messageInterval);

  await sendCandidates();
};