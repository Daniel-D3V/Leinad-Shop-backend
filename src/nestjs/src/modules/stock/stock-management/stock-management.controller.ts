import { Body, Controller, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import {  ChangeStockTypeToAutoFactory, ChangeStockTypeToNormalFactory, ChangeStockTypeToItemFactory } from "@core/domain/dist/src/modules/stock/stock-management/factories"

@Controller('stock-management')
export class StockManagementController {

  @UseGuards(new AuthGuard())
  @Post("/to-stock-auto/:stockManagementId")
  async updateToStockAuto(@Param('stockManagementId') stockManagementId: string, @Body() updateStockDto: any, @Res() res: Response) {
    const changeStockTypeToAutoFactory = ChangeStockTypeToAutoFactory.create();
    const usecaseResult = await changeStockTypeToAutoFactory.execute({
      stockManagementId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

  @UseGuards(new AuthGuard())
  @Post("/to-stock-normal/:stockManagementId")
  async updateToStockNormal(@Param('stockManagementId') stockManagementId: string, @Body() updateStockDto: any, @Res() res: Response) {
    const changeStockTypeToNormalFactory = ChangeStockTypeToNormalFactory.create();
    const usecaseResult = await changeStockTypeToNormalFactory.execute({
      stockManagementId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

  @UseGuards(new AuthGuard())
  @Post("/to-stock-item/:stockManagementId")
  async updateToStockItem(@Param('stockManagementId') stockManagementId: string, @Body() updateStockDto: any, @Res() res: Response) {
    const changeStockTypeToItemFactory = ChangeStockTypeToItemFactory.create();
    const usecaseResult = await changeStockTypeToItemFactory.execute({
      stockManagementId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }
}
