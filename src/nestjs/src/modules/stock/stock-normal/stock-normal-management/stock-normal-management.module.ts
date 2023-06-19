import { Module } from '@nestjs/common';
import { StockNormalManagementController } from './stock-normal-management.controller';

@Module({
  controllers: [StockNormalManagementController],
  providers: []
})
export class StockNormalManagementModule {}
