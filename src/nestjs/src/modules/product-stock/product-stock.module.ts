import { Module } from '@nestjs/common';
import { ProductStockAutoController } from './product-stock-auto.controller';
import  { ProductStockNormalController } from "./product-stock-normal.controller"
import { ProductStockController } from "./product-stock.controller"

@Module({
  controllers: [ProductStockAutoController, ProductStockNormalController, ProductStockController],
  providers: []
})
export class ProductStockModule {}
