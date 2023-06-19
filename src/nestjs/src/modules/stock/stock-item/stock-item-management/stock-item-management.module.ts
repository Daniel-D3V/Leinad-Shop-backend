import { Module } from '@nestjs/common';
import { StockItemManagementController } from './stock-item-management.controller';

@Module({
  controllers: [StockItemManagementController],
  providers: []
})
export class StockItemManagementModule {}
