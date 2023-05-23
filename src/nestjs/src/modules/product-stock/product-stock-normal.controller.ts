import { Controller, Param, Post, Res } from '@nestjs/common';

@Controller('product-stock-normal')
export class ProductStockNormalController {

  @Post("/:categoryId")
  async activateCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    
  }
}
