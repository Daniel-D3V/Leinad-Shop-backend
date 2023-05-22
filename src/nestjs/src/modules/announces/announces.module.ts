import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AnnouncesController } from './announces.controller';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  controllers: [AnnouncesController],
  providers: []
})
export class AnnouncesModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {
        path: "announces",
        method: RequestMethod.POST
      }
      );
  }
}
