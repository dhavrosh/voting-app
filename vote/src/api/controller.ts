import { Request, ResponseToolkit } from 'hapi';
import * as uuid from 'uuid';

import { AmqpClient } from '../service';
import { PostRequest } from '../types';
import {
  VOTE_AMPQ_KEY,
  CANDIDATE_AMPQ_KEY,
  CANDIDATE_VOTE_AMPQ_KEY,
} from '../secrets';

interface VotePayload {
  vote: string;
}

const pollInterval = 5000;

export default class VoteController {

  private correlationId: string;
  private candidatesData: string;

  constructor(private ampqClient: AmqpClient) {
    this.ampqClient = ampqClient;
    this.ampqClient.consume(undefined, [CANDIDATE_VOTE_AMPQ_KEY], async (msg) => {
      if (msg.properties.correlationId === this.correlationId) {
        this.candidatesData = msg.content.toString();
      }
    });

    this.askCandidates();

    setInterval(this.askCandidates.bind(this), pollInterval);
  }

  private askCandidates() {
    this.correlationId = uuid.v4();

    this.ampqClient.produce(
      CANDIDATE_AMPQ_KEY,
      '',
      {
        replyTo: CANDIDATE_VOTE_AMPQ_KEY,
        correlationId: this.correlationId,
      },
    );
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
