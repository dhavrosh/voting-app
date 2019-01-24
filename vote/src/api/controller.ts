import { Request, ResponseToolkit } from 'hapi';

import { RedisNativeClient, requester } from '../service';
import { PostRequest } from '../types';
import { RLIST_NAME } from '../secrets';

interface VotePayload {
  vote: string;
}

export default class VoteController {

  constructor(private redis: RedisNativeClient) { }

  public async getCandidates(_: Request, h: ResponseToolkit) {
    const data = await requester.call('/');

    return h.view('index', { data: JSON.parse(data) });
  }

  public async vote(request: PostRequest<VotePayload>, h: ResponseToolkit) {

    await this.redis.rpushAsync(RLIST_NAME, request.payload.vote);

    return h.view('success');
  }
}
