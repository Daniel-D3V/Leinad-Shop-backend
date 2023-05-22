import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CheckAnnounceFromUserUsecaseFactory } from "@core/domain/dist/src/modules/announce/announce-admin/factories"
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';

@Injectable()
export class CheckAnnounceFromUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const checkAnnounceFromUserUsecase = CheckAnnounceFromUserUsecaseFactory.create()
    const usecaseResult = await checkAnnounceFromUserUsecase.execute({
      userId: req.currentUser.id,
      announceId: req.params?.announceId
    })

    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }

    next();
  }
}
