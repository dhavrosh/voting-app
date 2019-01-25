import { Request, ResponseToolkit } from 'hapi';

import { AmqpClient } from '../service';
import { PostRequest } from '../types';
import { VOTE_AMPQ_KEY, CANDIDATE_AMPQ_KEY } from '../secrets';

interface VotePayload {
  vote: string;
}

export default class VoteController {

  private candidatesData: string;

  constructor(private ampqClient: AmqpClient) {
    this.ampqClient = ampqClient;
    this.ampqClient.consume(undefined, [CANDIDATE_AMPQ_KEY], async (msg) => {
      this.candidatesData = msg.content.toString();
    });
  }

  public getCandidates(_: Request, h: ResponseToolkit) {
    const data = this.candidatesData ? JSON.parse(this.candidatesData) : [];

    return h.view('index', { data });
  }

  public async vote(request: PostRequest<VotePayload>, h: ResponseToolkit) {

    await this.ampqClient.produce(VOTE_AMPQ_KEY, request.payload.vote);

    return h.view('success');
  }
}
