import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';

import { 
  GenerateMercadopagoPaymentUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/mercadopago-provider/factory/usecases/mercadopago-actions"

import { 
  RedirectMercadopagoActionsUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/mercadopago-provider/factory/usecases/application-actions"

@Controller('payment/mercadopago')
export class MercadopagoProviderController {

  //dddddd
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() body: any ,@Res() res: Response) {
    const usecase = GenerateMercadopagoPaymentUsecaseFactory.create()
    const result = await usecase.execute({
      ...body
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }
  //ddddddddfd
  @Post("/callback")
  async callback(@Body() body: any, @Res() res: Response) {
    console.log(body)
    const usecase = RedirectMercadopagoActionsUsecaseFactory.create()
    const result = await usecase.execute({
      action: body.action,
      mercadoPagoPaymentId: body.data?.id ?? ""
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}

