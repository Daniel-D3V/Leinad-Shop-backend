import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: []
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {
          path: "auth/current-user",
          method: RequestMethod.POST
        }
      );
  }
}
