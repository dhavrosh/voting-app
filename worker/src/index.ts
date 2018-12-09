import * as Restify from 'restify';

import { pollVoteList } from './controller';
import { RHOST, HOST, PORT } from './secrets';
import { RedisClient } from '../../common/redis';

const start = async () => {
  const server = Restify.createServer();

  const redis = new RedisClient(console);

  const redisClient = await redis.connect({ host: RHOST });

  server.listen(PORT, HOST, () => {
    console.log(`${server.name} listening at ${server.url}`);

    pollVoteList(redisClient);
  });
};

start();