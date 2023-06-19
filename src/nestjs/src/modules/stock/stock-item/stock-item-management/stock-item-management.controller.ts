import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { Request, Response } from "express"
import { 
  CreateStockItemManagementUsecaseFactory,
  ChangeStockItemManagementTypeToAutoUsecaseFactory,
  ChangeStockItemManagementTypeToNormalUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-item/stock-item-management/factories"

@Controller('stock-item')
export class StockItemManagementController {
 
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createStockItemDto: any, @Res() res: Response) {
    const usecase = CreateStockItemManagementUsecaseFactory.create()
    const result = await usecase.execute({
      ...createStockItemDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-auto/:stockItemManagementId")
  async changeTypeToAuto(@Param('stockItemManagementId') stockItemManagementId: string, @Res() res: Response) {
    const usecase = ChangeStockItemManagementTypeToAutoUsecaseFactory.create()
    const result = await usecase.execute({
      stockItemManagementId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-normal/:stockItemManagementId")
  async changeTypeToNormal(@Param('stockItemManagementId') stockItemManagementId: string, @Res() res: Response) {
    const usecase = ChangeStockItemManagementTypeToNormalUsecaseFactory.create()
    const result = await usecase.execute({
      stockItemManagementId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
