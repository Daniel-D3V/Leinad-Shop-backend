import { Body, Controller, Post, Res, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express"
import { ApplicationError } from "src/utils";
import {
    Generate2faUsecaseFactory
} from "@core/domain/dist/src/modules/auth/2fa/factories"
import { AuthGuard } from "src/guards";

@Controller('auth/2fa')
export class Auth2faController { 

    @UseGuards(new AuthGuard())
    @Post("")
    async create(@Req() req: Request, @Res() res: Response) {
      const usecase = Generate2faUsecaseFactory.create()
      const usecaseResult = await usecase.execute({
        userId: req.currentUser.id
      })
      if (usecaseResult.isLeft()) {
        throw new ApplicationError(usecaseResult.value)
      }
      return res.json(usecaseResult.value)
    }
}///////sdasdfddfsfsddfdd