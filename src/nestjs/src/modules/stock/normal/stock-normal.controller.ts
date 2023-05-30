import { Body, Controller, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
// import { UpdateNormalStockUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories"
// import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { CheckProductStockFromUserGuard } from '../guards';

@Controller('product-stock-normal')
export class StockNormalController {

  // @UseGuards(new CheckProductStockFromUserGuard())
  // @Patch("/update-stock/:productStockId")
  // async updateProductStockNormal(@Param('productStockId') productStockId: string, @Body() updateProductStockDto: any, @Res() res: Response) {
  //   const updateNormalStockUsecase = UpdateNormalStockUsecaseFactory.create();
  //   const usecaseResult = await updateNormalStockUsecase.execute({
  //     productStockId,
  //     newStock: updateProductStockDto.newStock
  //   });
  //   if (usecaseResult.isLeft()) {
  //     throw new ApplicationError(usecaseResult.value)
  //   }
  //   return res.json();
  // }
}
////