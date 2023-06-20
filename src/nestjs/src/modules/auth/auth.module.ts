import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthEmailVerificationController } from "./email-verification.controller"
import { VerifyEmailConsumer } from './verify-email.consumer';
import { RabbitMQService } from 'src/services/rabbitmq/rabbitmq.service';
import { Auth2faController } from './2fa.controller';


@Module({
  controllers: [
    AuthController,
    AuthEmailVerificationController,
    VerifyEmailConsumer,
    Auth2faController
  ],
  providers: [
    RabbitMQService
  ]
})

export class AuthModule {}