import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';

import { 
  GeneratePaymentUsecaseFactory
} from "@core/domain/dist/src/modules/checkout/payment/factories"

@Controller('payment')
export class PaymentController {

//dddddddsfdfsddsfdsfsdfsdfsdfdsfdsfdsdsfsfsdffd
@UseGuards(new AuthGuard())
  @Post()
  async create(@Body() body: any,@Req() req: Request ,@Res() res: Response) {
    const usecase = GeneratePaymentUsecaseFactory.create()
    const result = await usecase.execute({
      ...body,
      customerId: req.currentUser.id
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }
}
