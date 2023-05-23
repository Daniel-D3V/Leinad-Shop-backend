import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import {  } from "@core/domain/dist/src/modules/product-stock/factories/"

@Controller('product-stock-auto')
export class ProductStockAutoController {

  @Post("/add/:productStockId")
  async addProductStock(@Body() addProductStockDto: any, @Res() res: Response) {
    
  }
}
//