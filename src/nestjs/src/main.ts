import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    name: 'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'event-sourcing-consumer',
      queueOptions: {
        durable: true
      },
      noAck: false
    },
  })
  await app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
