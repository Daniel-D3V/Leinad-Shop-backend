import { Body, Controller, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { UpdateStockNormalUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-normal/factories"
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';

@Controller('stock-normal')
export class StockNormalController {

  @UseGuards(new AuthGuard())
  @Patch("/update-stock/:stockNormalId")
  async updateProductStockNormal(@Param('stockNormalId') stockNormalId: string, @Body() updateStockDto: any, @Res() res: Response) {
    const updateStockNormalUsecase = UpdateStockNormalUsecaseFactory.create();
    const usecaseResult = await updateStockNormalUsecase.execute({
      stockNormalId,
      newStock: updateStockDto.newStock
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }
}
