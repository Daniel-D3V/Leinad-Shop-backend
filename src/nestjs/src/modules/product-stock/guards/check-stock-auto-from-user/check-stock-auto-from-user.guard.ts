import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CheckStockAutoFromUserUsecaseFactory } from "@core/domain/dist/src/modules/product-stock/factories"
import { Request } from 'express';
import { ApplicationError } from 'src/utils';


@Injectable()
export class CheckStockAutoFromUserGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const userId = request.currentUser?.id
    const productStockAutoId = request.params.productStockAutoId;
    const checkStockAutoFromUserUsecaseFactory = CheckStockAutoFromUserUsecaseFactory.create();
    const usecaseResult = await checkStockAutoFromUserUsecaseFactory.execute({
      productStockAutoId,
      userId
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return true;
  }
}
