import { Module } from '@nestjs/common';
import { AnnounceItemController } from './announce-item.controller';

@Module({
  controllers: [AnnounceItemController],
  providers: []
})
export class AnnounceItemModule {}
