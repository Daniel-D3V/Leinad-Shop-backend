import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';

import { 
  GenerateMercadopagoPaymentUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/mercadopago-provider/factory"

@Controller('payment/mercadopago')
export class MercadopagoProviderController {

//dddddddsfdfsddsfdsfsdfsdfsdfdsfdsfdsdsfsfsdffd
@UseGuards(new AuthGuard())
  @Post()
  async create(@Body() body: any,@Req() req: Request ,@Res() res: Response) {
    const usecase = GenerateMercadopagoPaymentUsecaseFactory.create()
    const result = await usecase.execute({
      orderId: body.orderId,
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }
}
