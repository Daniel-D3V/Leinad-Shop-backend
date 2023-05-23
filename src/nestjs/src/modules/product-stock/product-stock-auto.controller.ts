import { Controller, Param, Post, Res } from '@nestjs/common';

@Controller('product-stock')
export class ProductStockAutoController {

  @Post("/:categoryId")
  async activateCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    
  }
}
