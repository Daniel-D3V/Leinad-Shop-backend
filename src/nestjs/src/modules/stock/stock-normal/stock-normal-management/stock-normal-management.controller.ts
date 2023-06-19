import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { Request, Response } from "express"
import {  
  CreateStockNormalManagementUsecaseFactory,
  ChangeStockNormalManagementTypeToAutoUsecaseFactory,
  ChangeStockNormalManagementTypeToManualFactory
} from "@core/domain/dist/src/modules/stock/stock-normal/stock-normal-management/factories"

@Controller('stock-normal')
export class StockNormalManagementController {
  
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createStockNormalDto: any, @Res() res: Response) {
    const usecase = CreateStockNormalManagementUsecaseFactory.create()
    const result = await usecase.execute({
      ...createStockNormalDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-auto/:stockNormalManagementId")
  async changeTypeToAuto( @Param('stockNormalManagementId') stockNormalManagementId: string, @Res() res: Response) {
    const usecase = ChangeStockNormalManagementTypeToAutoUsecaseFactory.create()
    const result = await usecase.execute({
      stockNormalManagementId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-manual/:stockNormalManagementId")
  async changeTypeToManual( @Param('stockNormalManagementId') stockNormalManagementId: string, @Res() res: Response) {
    const usecase = ChangeStockNormalManagementTypeToManualFactory.create()
    const result = await usecase.execute({
      stockNormalManagementId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
