import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [
    AuthController
  ],
  providers: []
})

export class AuthModule {}