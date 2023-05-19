import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from "express";
import { formatError } from "@core/domain/dist/src/modules/@shared/utils"
import { SignupUsecaseFactory } from "@core/domain/dist/src/modules/auth/factories"


@Controller('auth')
export class AuthController {
  constructor() {}

  @Post("/signup")
  async create(@Body() signupDto: any, @Res() res: Response) {
    const signupUsecase = SignupUsecaseFactory.create()
    const serviceResult = await signupUsecase.execute(signupDto)
    if(serviceResult.isLeft()) {
      return res.status(400).json(formatError(serviceResult.value))
    }
    return res.json(serviceResult.value)
  }
}
