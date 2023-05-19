import { Injectable } from '@nestjs/common';
import { Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMQEventEmitterService {
  private channel: Channel;

  constructor() {
 
    
  }

  async publishToExchange(exchange: string, routingKey: string, data: any): Promise<void> {
    if (!this?.channel) {
      const connection = await connect('amqp://admin:admin@localhost:5672');
      this.channel = await connection.createChannel();
    }

    // this.channel.assertExchange(exchange, 'fanout', { durable: true });
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));
  }
}