import { RabbitmqServerProvider } from '@core/domain/dist/src/modules/@shared/infra/providers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQEventEmitterService {

  constructor() {
 
    
  }

  async publishToExchange(exchange: string, routingKey: string, data: any): Promise<void> {
    const rabbitmqServerProvider = new RabbitmqServerProvider(process.env.RABBITMQ_LOGIN_CREDENTIALS)
    await rabbitmqServerProvider.start()

    await rabbitmqServerProvider.assertExchange(exchange, 'fanout', { durable: true });
    await rabbitmqServerProvider.publishInExchange(exchange, routingKey, JSON.stringify(data));
  }
}