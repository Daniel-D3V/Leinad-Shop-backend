import { Body, Controller, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import { 
    ChangeStockItemTypeToAutoUsecaseFactory, 
    ChangeStockItemTypeToNormalUsecaseFactory, 

} from "@core/domain/dist/src/modules/stock/stock-item/factories"

@Controller('stock-item')
export class StockItemController {

  @UseGuards(new AuthGuard())
  @Post("/to-stock-auto/:stockItemId")
  async toTypeAuto(@Param('stockItemId') stockItemId: string, @Res() res: Response) {
    const changeStockItemTypeToAutoUsecaseFactory = ChangeStockItemTypeToAutoUsecaseFactory.create();
    const usecaseResult = await changeStockItemTypeToAutoUsecaseFactory.execute({
      stockItemId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

  @UseGuards(new AuthGuard())
  @Post("/to-stock-normal/:stockItemId")
  async toTypeNormal(@Param('stockItemId') stockItemId: string, @Res() res: Response) {
    const changeStockItemTypeToNormalUsecaseFactory = ChangeStockItemTypeToNormalUsecaseFactory.create();
    const usecaseResult = await changeStockItemTypeToNormalUsecaseFactory.execute({
      stockItemId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

}
