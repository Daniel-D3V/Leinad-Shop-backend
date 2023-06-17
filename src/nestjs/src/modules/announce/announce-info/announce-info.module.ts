import { Module } from '@nestjs/common';
import { AnnounceInfoController } from './announce-info.controller';

@Module({
  controllers: [AnnounceInfoController],
  providers: []
})
export class AnnounceInfoModule {}
