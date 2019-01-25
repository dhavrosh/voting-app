import {
  DB_URI,
  RABBITMQ_URI,
  EXCHANGE_NAME,
  VOTE_AMPQ_KEY,
} from './secrets';
import { AmqpClient, MysqlPool } from '../../common/service';

export const init = async () => {
  const pool = new MysqlPool({ uri: DB_URI });
  const amqpClient = await new AmqpClient(RABBITMQ_URI, EXCHANGE_NAME).init();

  amqpClient.consume(undefined, [VOTE_AMPQ_KEY], async (msg) => {
    const vote = msg.content.toString();

    pool.doQuery('INSERT INTO vote (candidate_id) VALUES (?);', vote);
  });
};