import { Request, Response } from 'express';
import { Server } from 'socket.io';

import { CANDIDATE_AMPQ_KEY, RESULT_AMPQ_KEY } from './secrets';
import { MysqlPool, AmqpClient } from '../../common/service';

export default class ResultController {

  private candidatesData: string;

  constructor(
    private io: Server, 
    private pool: MysqlPool, 
    private ampqClient: AmqpClient
  ) {
    this.io = io;
    this.pool = pool;
    this.ampqClient = ampqClient;

    this.initAmpqClient();
  }

  private initAmpqClient() {
    this.ampqClient.consume(undefined, [CANDIDATE_AMPQ_KEY], async (msg) => {
      this.candidatesData = msg.content.toString();
    });

    this.ampqClient.consume(undefined, [RESULT_AMPQ_KEY], async (_) => {
      const results = await this.fetchResults();

      this.io.sockets.emit('results', JSON.stringify(results));
    });
  }

  private async fetchResults() {
    return this.pool.doQuery('SELECT candidate_id, COUNT(id) AS count FROM vote GROUP BY candidate_id');
  }

  public async renderResults (_: Request, res: Response) {
    const data = this.candidatesData || "[]";
    const results = await this.fetchResults();
  
    res.render(
      'index',
      {
        results,
        data: JSON.parse(data),
        rawData: encodeURIComponent(JSON.stringify(data))
      }
    );
  }
}