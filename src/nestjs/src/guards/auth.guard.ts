
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationError } from 'src/utils';
import { GetUserByAccessTokenUsecaseFactory } from '@core/domain/dist/src/modules/auth/main/factories';

interface User {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}


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
