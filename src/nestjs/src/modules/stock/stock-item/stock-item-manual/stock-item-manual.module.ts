import { Module } from '@nestjs/common';
import { StockItemManualController } from './stock-item-manual.controller';

@Module({
  controllers: [StockItemManualController],
  providers: []
})
export class StockItemManualModule {}
