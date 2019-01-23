import * as Restify from 'restify';

import { pollVoteList } from './controller';
import { DB_URI, RHOST, HOST, PORT } from './secrets';

import { MysqlPool, RedisClient } from '../../common/service';

const start = async () => {
  
  const server = Restify.createServer();

  const mysqlPool = new MysqlPool({ uri: DB_URI });
  const redis: RedisClient = new RedisClient(console);
  const redisClient = await redis.connect({ host: RHOST });

  server.listen(PORT, HOST, async () => {
    console.log(`${server.name} listening at ${server.url}`);

    pollVoteList(redisClient, mysqlPool);

    const votes = await mysqlPool.doQuery('SELECT * FROM vote');
    console.log('votes', votes);
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();