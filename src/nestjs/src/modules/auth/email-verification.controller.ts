import { Body, Controller, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express"
import {
  GenerateEmailVerificationCodeUsecaseFactory,
  RegenerateEmailVerificationCodeUsecaseFactory,
  VerifyEmailVerificationCodeUsecaseFactory
} from "@core/domain/dist/src/modules/auth/email-verification-code/factories"
import { AuthGuard } from "src/guards";
import { formatError } from "@core/domain/dist/src/modules/@shared/utils";

@Controller('auth/email-verification')
export class AuthEmailVerificationController {
  
    @UseGuards(new AuthGuard())
    @Post()
    async generateEmailVerificationCode(@Req() req: Request, @Res() res: Response) {
      const generateEmailVerificationCodeUsecaseFactory = GenerateEmailVerificationCodeUsecaseFactory.create()
      const usecaseResult = await generateEmailVerificationCodeUsecaseFactory.execute({ 
        userId: req.currentUser.id
      })
      if(usecaseResult.isLeft()) {
        return res.status(400).json(formatError(usecaseResult.value))
      }
      return res.status(200).json(usecaseResult.value)
    }
  
    @UseGuards(new AuthGuard())
    @Post("regenerate")
    async regenerateEmailVerificationCode(@Req() req: Request, @Res() res: Response) {
      const regenerateEmailVerificationCodeUsecaseFactory = RegenerateEmailVerificationCodeUsecaseFactory.create()
      const usecaseResult = await regenerateEmailVerificationCodeUsecaseFactory.execute({ 
        userId: req.currentUser.id
      })
      if(usecaseResult.isLeft()) {
        return res.status(400).json(formatError(usecaseResult.value))
      }
      return res.status(200).json(usecaseResult.value)
    }

    @UseGuards(new AuthGuard())
    @Post("verify/:code")
    async verifyEmail(@Param('code') code: string, @Res() res: Response) {
      const verifyEmailVerificationCodeUsecaseFactory = VerifyEmailVerificationCodeUsecaseFactory.create()
      const usecaseResult = await verifyEmailVerificationCodeUsecaseFactory.execute({ 
        code
      })
      if(usecaseResult.isLeft()) {
        return res.status(400).json(formatError(usecaseResult.value))
      }
      return res.status(200).json()
    }

}