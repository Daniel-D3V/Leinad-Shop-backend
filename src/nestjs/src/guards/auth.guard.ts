
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationError } from 'src/utils';
import { CheckAnnounceFromUserUsecaseFactory } from '@core/domain/dist/src/modules/announce/announce-admin/factories';
import { GetUserByAccessTokenUsecaseFactory } from '@core/domain/dist/src/modules/auth/factories';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const { accessToken } = req.cookies
    const getUserByAccessTokenUsecase = GetUserByAccessTokenUsecaseFactory.create()
    const usecaseResult = await getUserByAccessTokenUsecase.execute({
        accessToken
    })
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    req.currentUser = usecaseResult.value
    
    return true;
  }
}
