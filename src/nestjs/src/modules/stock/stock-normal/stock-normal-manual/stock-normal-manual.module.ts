import { Module } from '@nestjs/common';
import { StockNormalManualController } from './stock-normal-manual.controller';

@Module({
  controllers: [StockNormalManualController],
  providers: []
})
export class StockNormalManualModule {}
