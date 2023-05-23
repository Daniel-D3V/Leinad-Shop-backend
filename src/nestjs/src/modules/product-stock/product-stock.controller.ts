import { Controller, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('product-stock')
export class ProductStockController {

  @Patch("/update-stock/:productStockId")
  async activateCategory(@Param('productStockId') productStockId: string, @Res() res: Response) {
    
  }
}
