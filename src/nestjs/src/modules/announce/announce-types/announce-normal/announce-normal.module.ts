import { Module } from '@nestjs/common';
import { AnnounceNormalController } from './announce-normal.controller';

@Module({
  controllers: [AnnounceNormalController],
  providers: []
})
export class AnnounceNormalModule {}
