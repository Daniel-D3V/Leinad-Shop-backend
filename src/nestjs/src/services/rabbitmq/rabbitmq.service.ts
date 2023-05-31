import { RabbitmqServerProvider } from '@core/domain/dist/src/modules/@shared/infra/providers';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Message, Options } from 'amqplib';

@Injectable()
export class RabbitMQService implements  OnApplicationShutdown  {

  private rabbitmqServerProvider: RabbitmqServerProvider
  constructor(){
    this.rabbitmqServerProvider = new RabbitmqServerProvider(process.env.RABBITMQ_LOGIN_CREDENTIALS)
  }


  async onApplicationShutdown(signal?: string) {
    await this.rabbitmqServerProvider.close()
  }

  async publishToExchange(exchange: string, routingKey: string, data: any): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.publishInExchange(exchange, routingKey, data);
  }

  async bindQueue(queue: string, exchange: string, routingKey: string): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.bindQueue(queue, exchange, routingKey)
  }

  async assertExchange(exchange: string, type: string, options?: Options.AssertExchange): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.assertExchange(exchange, type, options)
  }

  async assertQueue(queue: string, options?: Options.AssertQueue): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.assertQueue(queue, options)
  }

  async consume(queue: string, callback: RabbitMQService.ConsumerCallback): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.consume(queue, callback)
  }

  async setupConsumer({ exchange, queue }: RabbitMQService.SetupConsumerInput, callback: RabbitMQService.ConsumerCallback): Promise<void> {
    await this.assertExchange(exchange, "fanout", { durable: true, })
    await this.assertQueue(queue, { durable: true });
    await this.bindQueue(queue, exchange, 'AnnounceCreatedEvent');
    await this.consume(queue, callback)
  }

}


export namespace RabbitMQService {
    export type SetupConsumerInput = {
      queue: string
      exchange: string
    } 

    export type ConsumerCallback = (message: Message) => Promise<void>
}