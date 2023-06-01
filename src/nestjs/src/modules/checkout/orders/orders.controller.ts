import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PlaceOrderUsecaseFactory } from "@core/domain/dist/src/modules/checkout/order/factories"
import { ApplicationError } from 'src/utils';
import {  Response, Request } from 'express';
import { AuthGuard, CheckAnnounceFromUserGuard } from 'src/guards';

@Controller('orders')
export class OrdersController {

  @UseGuards(new AuthGuard())
  @Post("place-order")
  async create(@Body() placeOrderDto: any, @Req() req: Request ,@Res() res: Response) {
////////
    const placeOrderUsecase = PlaceOrderUsecaseFactory.create()
    const usecaseResult = await placeOrderUsecase.execute({
      products: placeOrderDto.products ?? [],
      customerId: req.currentUser.id
    })
    if(usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }
    return res.json(usecaseResult.value)
  }
}
