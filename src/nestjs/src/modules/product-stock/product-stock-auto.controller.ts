import { Body, Controller, Delete, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
// import { AddAutoStockUsecaseFactory, ChangeAutoStockValueUsecaseFactory, DeleteAutoStockUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories/"
// import { Response, Request } from 'express';
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { CheckProductStockFromUserGuard } from './guards';


@Controller('product-stock-auto')
export class ProductStockAutoController {

  // @UseGuards(new CheckProductStockFromUserGuard())
  // @Post("/add/:productStockId")
  // async addProductStock(@Param('productStockId') announceId: string, @Body() addProductStockDto: any, @Res() res: Response) {
  //   const addAutoStockUsecase = AddAutoStockUsecaseFactory.create();
  //   const usecaseResult = await addAutoStockUsecase.execute({
  //     value: addProductStockDto.value,
  //     productStockId: announceId,
  //   });
  //   if (usecaseResult.isLeft()) {
  //     return res.status(400).json(formatError(usecaseResult.value));
  //   }
  //   return res.status(200).json(usecaseResult.value);
  // }

  // @UseGuards(new CheckProductStockFromUserGuard())
  // @Post("/change-value/:productStockId")
  // async changeAutoStockValue(@Param('productStockId') productStockAutoId: string, @Body() addProductStockDto: any, @Res() res: Response) {

  //   const changeAutoStockValueUsecase = ChangeAutoStockValueUsecaseFactory.create();
  //   const usecaseResult = await changeAutoStockValueUsecase.execute({
  //     productStockAutoId,
  //     value: addProductStockDto.value,
  //   });
  //   if (usecaseResult.isLeft()) {
  //     return res.status(400).json(formatError(usecaseResult.value));
  //   }
  //   return res.status(200).json();
  // }

  // @UseGuards(new CheckProductStockFromUserGuard())
  // @Delete("/:productStockId")
  // async deleteAutoStockValue(@Param('productStockId') productStockAutoId: string, @Body() addProductStockDto: any, @Res() res: Response) {

  //   const deleteAutoStockUsecase = DeleteAutoStockUsecaseFactory.create();
  //   const usecaseResult = await deleteAutoStockUsecase.execute({
  //     productStockAutoId
  //   });
  //   if (usecaseResult.isLeft()) {
  //     return res.status(400).json(formatError(usecaseResult.value));
  //   }
  //   return res.status(200).json();
  // }

}
//