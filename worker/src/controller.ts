import { RedisClient } from 'redis';

import { RLIST_NAME } from './secrets';

const pollTimeout = 1000;

export const pollVoteList = async (client: RedisClient) => {
  const item = await client.blpopAsync(RLIST_NAME, pollTimeout);

  console.log('New Vote', item);

  pollVoteList(client);
}