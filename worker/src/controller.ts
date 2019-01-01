import { RedisClient } from 'redis';

import { RLIST_NAME } from './secrets';
import { MysqlPool } from '../../common/mysql';

const pollTimeout = 1000;

const createVote = async (mysqlPool: MysqlPool, [_, vote]: Array<string>) => 
  mysqlPool.doQuery('INSERT INTO vote (candidate_id) VALUES (?);', vote);

export const pollVoteList = async (redisClient: RedisClient, mysqlPool: MysqlPool) => {
  const voteRes = await redisClient.blpopAsync(RLIST_NAME, pollTimeout);

  console.log('voteRes', voteRes);

  await createVote(mysqlPool, voteRes);

  pollVoteList(redisClient, mysqlPool);
}