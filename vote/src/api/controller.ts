import { RedisClient } from 'redis';

export default class VoteController {

  constructor(private redis: RedisClient) {}

  get() {
    return 'Hello World';
  }
}
