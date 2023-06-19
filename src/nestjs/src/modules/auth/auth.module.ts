import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthEmailVerificationController } from "./email-verification.controller"
import { VerifyEmailConsumer } from './verify-email.consumer';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';

@Module({
  controllers: [
    AuthController,
    AuthEmailVerificationController,
    VerifyEmailConsumer,
  ],
  providers: [
    RabbitMQService
  ]
})

export class AuthModule {}