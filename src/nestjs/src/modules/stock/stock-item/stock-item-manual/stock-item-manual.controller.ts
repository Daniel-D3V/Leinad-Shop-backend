import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { Request, Response } from "express"
import { 
   CreateStockItemManualUsecaseFactory,
   UpdateStockItemManualUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-item/stock-item-manual/factories"

@Controller('stock-item-manual')
export class StockItemManualController {

  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createStockItemManualDto: any, @Res() res: Response) {
    const usecase = CreateStockItemManualUsecaseFactory.create()
    const result = await usecase.execute({
      ...createStockItemManualDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/update-stock/:stockItemManualId")
  async changeTypeToAuto(@Param('stockItemManualId') stockItemManualId: string,@Body() updateStockItemManualDto: any, @Res() res: Response) {
    const usecase = UpdateStockItemManualUsecaseFactory.create()
    const result = await usecase.execute({
      stockItemManualId,
      ...updateStockItemManualDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

}
