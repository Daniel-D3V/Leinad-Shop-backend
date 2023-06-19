import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { Request, Response } from "express"
import { ApplicationError } from 'src/utils';
import {  
  AddStockItemAutoUsecaseFactory,
  ChangeStockItemAutoValueUsecaseFactory,
  DeleteStockItemAutoUsecaseFactory
} from "@core/domain/src/modules/stock/stock-item/stock-item-auto/factories"

@Controller('stock-item-auto')
export class StockItemAutoController {

  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() addStockItemAutoDto: any, @Res() res: Response) {
    const usecase = AddStockItemAutoUsecaseFactory.create()
    const result = await usecase.execute({
      ...addStockItemAutoDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }
}
