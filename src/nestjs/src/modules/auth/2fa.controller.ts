import { Body, Controller, Post, Res, Req, UseGuards, Delete } from "@nestjs/common";
import { Request, Response } from "express"
import { ApplicationError } from "src/utils";
import {
    Generate2faUsecaseFactory,
    Remove2faUsecaseFactory,
    Validate2faUsecaseFactory,
    Verify2faCodeUsecaseFactory
} from "@core/domain/dist/src/modules/auth/2fa/factories"
import { AuthGuard } from "src/guards";

@Controller('auth/2fa')
export class Auth2faController { 

    @UseGuards(new AuthGuard())
    @Post()
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

    @UseGuards(new AuthGuard())
    @Delete()
    async remove(@Req() req: Request, @Res() res: Response) {
      const usecase = Remove2faUsecaseFactory.create()
      const usecaseResult = await usecase.execute({
        userId: req.currentUser.id
      })
      if (usecaseResult.isLeft()) {
        throw new ApplicationError(usecaseResult.value)
      }
      return res.status(200).json()
    }

    @UseGuards(new AuthGuard())
    @Post("/validate")
    async validate(@Req() req: Request, @Res() res: Response) {
      const usecase = Validate2faUsecaseFactory.create()
      const usecaseResult = await usecase.execute({
        userId: req.currentUser.id,
        ...req.body
      })
      if (usecaseResult.isLeft()) {
        throw new ApplicationError(usecaseResult.value)
      }
      return res.status(200).json()
    }

    @UseGuards(new AuthGuard())
    @Post("/verify")
    async verify(@Req() req: Request, @Res() res: Response) {
      const usecase = Verify2faCodeUsecaseFactory.create()
      const usecaseResult = await usecase.execute({
        ...req.body
      })
      if (usecaseResult.isLeft()) {
        throw new ApplicationError(usecaseResult.value)
      }
      return res.status(200).json()
    }


}