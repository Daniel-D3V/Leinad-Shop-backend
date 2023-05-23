import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationError } from 'src/utils';
import { CheckAnnounceFromUserUsecaseFactory } from '@core/domain/dist/src/modules/announce/announce-admin/factories';

@Injectable()
export class CheckProductStockFromUserGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const userId = request.currentUser?.id
    const productStockId = request.params?.productStockId
    
    const checkAnnounceFromUserUsecase = CheckAnnounceFromUserUsecaseFactory.create()
    const usecaseResult = await checkAnnounceFromUserUsecase.execute({
      userId: userId,
      announceId: productStockId
    })

    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return true;
  }
}
