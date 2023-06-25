import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';
import { 
  PlaceOrderUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/order/factories"

@Controller('order')
export class OrderController {

  //dfdfdsfdfdf
  @UseGuards(new AuthGuard())
  @Post("/place-order")
  async create(@Body() placeOrderDtoDto: any,@Req() req: Request ,@Res() res: Response) {
    const usecase = PlaceOrderUsecaseFactory.create()
    const result = await usecase.execute({
      ...placeOrderDtoDto,
      customerId: req.currentUser.id
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }


}
