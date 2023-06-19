import { Module } from '@nestjs/common';
import { StockNormalAutoController } from './stock-normal-auto.controller';

@Module({
  controllers: [StockNormalAutoController],
  providers: []
})
export class StockNormalAutoModule {}
