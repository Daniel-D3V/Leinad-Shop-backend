import { Body, Controller, Param, Post, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { Request, Response } from "express"
import { ApplicationError } from 'src/utils';
import {  
  AddStockItemAutoUsecaseFactory,
  ChangeStockItemAutoValueUsecaseFactory,
  DeleteStockItemAutoUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-item/stock-item-auto/factories"

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

  @UseGuards(new AuthGuard())
  @Post("/change-value/:stockItemAutoId")
  async changeValue(@Param('stockItemAutoId') stockItemAutoId: string, @Body() inputDto: any, @Res() res: Response) {
    const usecase = ChangeStockItemAutoValueUsecaseFactory.create()
    const result = await usecase.execute({
      ...inputDto,
      stockItemAutoId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Delete("/:stockItemAutoId")
  async delete(@Param('stockItemAutoId') stockItemAutoId: string, @Res() res: Response) {
    const usecase = DeleteStockItemAutoUsecaseFactory.create()
    const result = await usecase.execute({
      stockItemAutoId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
