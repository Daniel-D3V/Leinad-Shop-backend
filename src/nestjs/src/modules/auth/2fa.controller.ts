import { Body, Controller, Post, Res } from "@nestjs/common";
import { Request, Response } from "express"
import { ApplicationError } from "src/utils";
import {
    Generate2faUsecaseFactory
} from "@core/domain/dist/src/modules/auth/2fa/factories"

@Controller('auth/2fa')
export class Auth2faController { 
    @Post("")
    async create(@Body() createDto: any, @Res() res: Response) {
      const usecase = Generate2faUsecaseFactory.create()
      const usecaseResult = await usecase.execute(createDto)
      if (usecaseResult.isLeft()) {
        throw new ApplicationError(usecaseResult.value)
      }
      return res.json(usecaseResult.value)
    }
}