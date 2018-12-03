import { ResponseToolkit } from 'hapi';
import { RedisClient } from 'redis';

import { PostRequest } from '../types';
import { RLIST_NAME } from '../secrets';

interface VotePayload {
  vote: string;
}

export default class VoteController {

  constructor(private redis: RedisClient) {}

  public async vote(request: PostRequest<VotePayload>, h: ResponseToolkit) {

    await this.redis.rpushAsync(RLIST_NAME, request.payload.vote);

    return h.view('success');
  }
}
