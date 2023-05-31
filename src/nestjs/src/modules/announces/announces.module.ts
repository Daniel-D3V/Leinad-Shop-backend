import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AnnouncesController } from './announce-admin/announces.controller';
import { CheckAnnounceFromUserMiddleware } from 'src/middlewares/check-announce-from-user/check-announce-from-user.middleware';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { AnnounceItemController } from './announce-item/announce-item.controller';


@Module({
  controllers: [
    AnnouncesController,
    AnnounceItemController
  ],
  providers: []
})
export class AnnouncesModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {
        path: "announces/*",
        method: RequestMethod.ALL
      },
      {
        path: "announces",
        method: RequestMethod.ALL
      }
    )
    .apply(CheckAnnounceFromUserMiddleware)
    .forRoutes(
      {
      path: "announces/*/:announceId",
      method: RequestMethod.ALL
      },
      {
        path: "announces/:announceId",
        method: RequestMethod.DELETE
      }
    )
  }
}
