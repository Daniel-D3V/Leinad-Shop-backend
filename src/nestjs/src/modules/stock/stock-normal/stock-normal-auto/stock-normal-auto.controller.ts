import { Body, Controller, Param, Post, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { Request, Response } from 'express';
import {
  AddStockNormalAutoUsecaseFactory,
  ChangeStockNormalAutoValueUsecaseFactory,
  DeleteStockNormalAutoUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-normal/stock-normal-auto/factories"

@Controller('stock-normal-auto')
export class StockNormalAutoController {
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createStockNormalManualDto: any, @Res() res: Response) {
    const usecase = AddStockNormalAutoUsecaseFactory.create()
    const result = await usecase.execute({
      ...createStockNormalManualDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-value/:stockNormalAutoId")
  async changeValue( @Param('stockNormalAutoId') stockNormalAutoId: string,@Body() updateDto: any, @Res() res: Response) {
    const usecase = ChangeStockNormalAutoValueUsecaseFactory.create()
    const result = await usecase.execute({
      stockNormalAutoId,
      ...updateDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Delete("/:stockNormalAutoId")
  async delete( @Param('stockNormalAutoId') stockNormalAutoId: string, @Res() res: Response) {
    const usecase = DeleteStockNormalAutoUsecaseFactory.create()
    const result = await usecase.execute({
      stockNormalAutoId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
