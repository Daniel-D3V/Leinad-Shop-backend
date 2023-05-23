import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AddAutoStockUsecaseFactory, ChangeAutoStockValueUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories/"
import { Response, Request } from 'express';
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('product-stock-auto')
export class ProductStockAutoController {

  @Post("/add/:announceId")
  async addProductStock(@Param('announceId') announceId: string, @Body() addProductStockDto: any, @Res() res: Response) {
    const addAutoStockUsecase = AddAutoStockUsecaseFactory.create();
    const usecaseResult = await addAutoStockUsecase.execute({
      value: addProductStockDto.value,
      productStockId: announceId,
    });
    if (usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value));
    }
    return res.status(200).json(usecaseResult.value);
  }

  @Post("/change-value/:productStockAutoId")
  @UseGuards(new AuthGuard())
  async changeAutoStockValue(@Param('productStockAutoId') productStockAutoId: string, @Body() addProductStockDto: any, @Res() res: Response) {
    const changeAutoStockValueUsecase = ChangeAutoStockValueUsecaseFactory.create();
    const usecaseResult = await changeAutoStockValueUsecase.execute({
      productStockAutoId,
      value: addProductStockDto.value,
    });
    if (usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value));
    }
    return res.status(200).json();
  }

}
//