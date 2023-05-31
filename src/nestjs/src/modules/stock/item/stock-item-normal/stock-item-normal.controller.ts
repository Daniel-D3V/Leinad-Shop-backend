import { Body, Controller, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import { 
    UpdateStockItemNormalUsecaseFactory

} from "@core/domain/dist/src/modules/stock/stock-item/factories"

@Controller('stock-item-normal')
export class StockItemNormalController {

  @UseGuards(new AuthGuard())
  @Post("/update-stock/:stockItemNormalId")
  async updateStock(@Param('stockItemNormalId') stockItemNormalId: string, @Body() updateStockDto: any, @Res() res: Response) {
    const updateStockItemNormalUsecaseFactory = UpdateStockItemNormalUsecaseFactory.create();
    const usecaseResult = await updateStockItemNormalUsecaseFactory.execute({
        stockItemNormalId,
        stock: updateStockDto.stock
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }


}
