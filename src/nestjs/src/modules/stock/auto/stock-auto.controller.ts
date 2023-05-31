import { Body, Controller, Delete, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import {  AddStockAutoUsecaseFactory, ChangeStockAutoValueUsecaseFactory, DeleteStockAutoUsecaseFactory } from "@core/domain/dist/src/modules/stock/stock-auto/factories"

@Controller('stock-auto')
export class StockAutoController {

  @UseGuards(new AuthGuard())
  @Post("/add")
  async add( @Body() addDto: any, @Res() res: Response) {
    const addStockAutoUsecaseFactory = AddStockAutoUsecaseFactory.create();
    const usecaseResult = await addStockAutoUsecaseFactory.execute({
      announceId: addDto.announceId,
      value: addDto.value
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json(usecaseResult.value);
  }

  @UseGuards(new AuthGuard())
  @Post("/change-value/:stockAutoId")
  async changeValue(@Param('stockAutoId') stockAutoId: string, @Body() changeDto: any, @Res() res: Response) {
    const changeStockAutoValueUsecaseFactory = ChangeStockAutoValueUsecaseFactory.create();
    const usecaseResult = await changeStockAutoValueUsecaseFactory.execute({
      stockAutoId,
      value: changeDto.value
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

  @UseGuards(new AuthGuard())
  @Delete("/:stockAutoId")
  async delete(@Param('stockAutoId') stockAutoId: string, @Body() changeDto: any, @Res() res: Response) {
    const deleteStockAutoUsecaseFactory = DeleteStockAutoUsecaseFactory.create();
    const usecaseResult = await deleteStockAutoUsecaseFactory.execute({
      stockAutoId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }
}
