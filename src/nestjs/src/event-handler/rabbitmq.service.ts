import { RabbitmqServerProvider } from '@core/domain/dist/src/modules/@shared/infra/providers';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Message } from 'amqplib';

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
    await this.rabbitmqServerProvider.assertExchange(exchange, 'fanout', { durable: true });
    await this.rabbitmqServerProvider.publishInExchange(exchange, routingKey, JSON.stringify(data));
  }

  async consume(queue: string, callback: (message: Message) => void): Promise<void> {
    await this.rabbitmqServerProvider.start()
    await this.rabbitmqServerProvider.consume(queue, callback)
  }
}