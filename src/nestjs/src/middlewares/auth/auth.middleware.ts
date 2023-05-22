import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { GetUserByAccessTokenUsecaseFactory } from '@core/domain/dist/src/modules/auth/factories';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

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
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {

    const { accessToken } = req.cookies
    const getUserByAccessTokenUsecase = GetUserByAccessTokenUsecaseFactory.create()
    const usecaseResult = await getUserByAccessTokenUsecase.execute({
        accessToken
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    req.currentUser = usecaseResult.value
    return res.status(200).json(usecaseResult.value)

    next();
  }
}
