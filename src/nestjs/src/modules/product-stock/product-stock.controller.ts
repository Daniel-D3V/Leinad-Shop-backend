import { Controller, Param, Post, Res } from '@nestjs/common';

@Controller('product-stock')
export class ProductStockController {

  @Post("/:categoryId")
  async activateCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    
  }
}
