import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthEmailVerificationController } from "./email-verification.controller"

@Module({
  controllers: [
    AuthController,
    AuthEmailVerificationController
  ],
  providers: []
})

export class AuthModule {}