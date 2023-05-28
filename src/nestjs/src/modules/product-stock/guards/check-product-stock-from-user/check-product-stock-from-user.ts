import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApplicationError } from 'src/utils';
// import { CheckProductStockFromUserUsecaseFactory } from '@core/domain/dist/src/modules/product-stock/factories';

@Injectable()
export class CheckProductStockFromUserGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();

    // const userId = request.currentUser?.id
    // const productStockId = request.params?.productStockId
    
    // const checkProductStockFromUserUsecase = CheckProductStockFromUserUsecaseFactory.create()
    // const usecaseResult = await checkProductStockFromUserUsecase.execute({
    //   userId: userId,
    //   productStockId: productStockId
    // })

    // if (usecaseResult.isLeft()) {
    //   throw new ApplicationError(usecaseResult.value)
    // }

    return true;
  }
}
