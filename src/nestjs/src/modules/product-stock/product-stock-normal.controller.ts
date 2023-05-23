import { Body, Controller, Param, Patch, Post, Res } from '@nestjs/common';
import { UpdateNormalStockUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories"
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"

@Controller('product-stock-normal')
export class ProductStockNormalController {

  @Patch("/update-stock/:productStockId")
  async updateProductStockNormal(@Param('productStockId') productStockId: string, @Body() updateProductStockDto: any, @Res() res: Response) {
    const updateNormalStockUsecase = UpdateNormalStockUsecaseFactory.create();
    const usecaseResult = await updateNormalStockUsecase.execute({
      productStockId,
      newStock: updateProductStockDto.newStock
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }
    return res.json();
  }
}
////