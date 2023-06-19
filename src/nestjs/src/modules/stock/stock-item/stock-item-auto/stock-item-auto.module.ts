import { Module } from '@nestjs/common';
import { StockItemAutoController } from './stock-item-auto.controller';

@Module({
  controllers: [StockItemAutoController],
  providers: []
})
export class StockItemAutoModule {}
