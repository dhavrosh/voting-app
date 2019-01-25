import * as amqp from 'amqplib';

export interface AmqpClient {
  init(): Promise<AmqpClient>;
  produce(routingKey: string, msg: string): boolean;
  consume(
    queueName: string | undefined,
    routeKeys: Array<string>,
    onMessage: (msg: amqp.ConsumeMessage, channel: amqp.Channel) => Promise<void>
  ): Promise<void>;
}

export class AmqpClient implements AmqpClient {

  private channel: amqp.Channel;

  constructor(private uri: string, private exchangeName: string) { }

  async init() {
    const connection = await amqp.connect(this.uri);

    this.channel = await connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, 'direct');

    return this;
  }

  async consume(
    queueName: string = '',
    routeKeys: Array<string>,
    onMessage: (msg: amqp.ConsumeMessage, channel: amqp.Channel) => Promise<void>
  ) {
    const { queue } = await this.channel.assertQueue(queueName, { exclusive: true });

    routeKeys.forEach(key => this.channel.bindQueue(queue, this.exchangeName, key));

    this.channel.consume(queue, async msg => {
      if (msg) {
        await onMessage(msg, this.channel);
        this.channel.ack(msg);
      }
    });
  }

  produce(routingKey: string, msg: string, options?: amqp.Options.Publish) {
    return this.channel.publish(this.exchangeName, routingKey, new Buffer(msg), options);
  }
}