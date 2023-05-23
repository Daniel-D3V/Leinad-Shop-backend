import { Controller, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { GetStockAvailabilityUsecaseFactory, ChangeProductStockTypeToAutoUsecaseFactory, ChangeProductStockTypeToManualUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories"
import { ApplicationError } from 'src/utils';
import { Request, Response } from "express"
import { CheckProductStockFromUserGuard } from './guards';

@Controller('product-stock')
export class ProductStockController {

  @UseGuards(new CheckProductStockFromUserGuard())
  @Get("/stock-availability/:productStockId")
  async getStockAvailability(@Param('productStockId') productStockId: string, @Res() res: Response) {
    const getStockAvailabilityUsecase = GetStockAvailabilityUsecaseFactory.create()
    const usecaseResult = await getStockAvailabilityUsecase.execute({
      productStockId
    })
    if(usecaseResult.isLeft()){
      throw new ApplicationError(usecaseResult.value)
    }
    return res.status(200).json(usecaseResult.value)
  }

  @UseGuards(new CheckProductStockFromUserGuard())
  @Post("/change-type-auto/:productStockId")
  async changeToStockAuto(@Param('productStockId') productStockId: string, @Res() res: Response) {
    const changeProductStockTypeToAutoUsecase = ChangeProductStockTypeToAutoUsecaseFactory.create()
    const usecaseResult = await changeProductStockTypeToAutoUsecase.execute({
      productStockId
    })
    if(usecaseResult.isLeft()){
      throw new ApplicationError(usecaseResult.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new CheckProductStockFromUserGuard())
  @Post("/change-type-normal/:productStockId")
  async changeToStockNormal(@Param('productStockId') productStockId: string, @Res() res: Response) {
    const changeProductStockTypeToManualUsecase = ChangeProductStockTypeToManualUsecaseFactory.create()
    const usecaseResult = await changeProductStockTypeToManualUsecase.execute({
      productStockId
    })
    if(usecaseResult.isLeft()){
      throw new ApplicationError(usecaseResult.value)
    }
    return res.status(200).json()
  }
}
