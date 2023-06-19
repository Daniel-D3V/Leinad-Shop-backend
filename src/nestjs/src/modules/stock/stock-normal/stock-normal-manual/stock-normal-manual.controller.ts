import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { Request, Response } from 'express';
import {
  CreateStockNormalManualUsecaseFactory,
  UpdateStockNormalManualUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-normal/stock-normal-manual/factories"

@Controller('stock-normal-manual')
export class StockNormalManualController {

  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createStockNormalManualDto: any, @Res() res: Response) {
    const usecase = CreateStockNormalManualUsecaseFactory.create()
    const result = await usecase.execute({
      ...createStockNormalManualDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/update-stock/:stockNormalManualId")
  async changeTypeToAuto( @Param('stockNormalManualId') stockNormalManualId: string,@Body() updateDto: any, @Res() res: Response) {
    const usecase = UpdateStockNormalManualUsecaseFactory.create()
    const result = await usecase.execute({
      stockNormalManualId,
      ...updateDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
