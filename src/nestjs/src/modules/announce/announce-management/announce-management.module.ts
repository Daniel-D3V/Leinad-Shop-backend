import { Module } from '@nestjs/common';
import { AnnounceManagementController } from './announce-management.controller';

@Module({
  controllers: [
    AnnounceManagementController
  ],
  providers: []
})
export class AnnounceManagementModule {}
