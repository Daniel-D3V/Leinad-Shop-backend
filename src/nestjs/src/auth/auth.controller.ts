import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from "express";
import { formatError } from "@core/domain/dist/src/modules/@shared/utils"
import { SignupUsecaseFactory, LoginUsecaseFactory } from "@core/domain/dist/src/modules/auth/factories"


@Controller('auth')
export class AuthController {
  constructor() {}

  @Post("/signup")
  async create(@Body() signupDto: any, @Res() res: Response) {
    const signupUsecase = SignupUsecaseFactory.create()
    const usecaseResult = await signupUsecase.execute(signupDto)
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.json(usecaseResult.value)
  }

  @Post("/login")
  async login(@Body() loginDto: any, @Res() res: Response) {
    const loginUsecase = LoginUsecaseFactory.create()
    const usecaseResult = await loginUsecase.execute(loginDto)
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }//////
    res.cookie("token", usecaseResult.value.token, { httpOnly: true })
    res.cookie("refreshToken", usecaseResult.value.refreshToken, { httpOnly: true })

    return res.status(200).json()
  }
}
