import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from "express";
import { AuthService } from './auth.service';
import { formatError } from "@core/domain/dist/src/modules/@shared/utils"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async create(@Body() createAuthDto: any, @Res() res: Response) {
    const serviceResult = await this.authService.create(createAuthDto);
    if(serviceResult.isLeft()) {
      return res.status(400).json(formatError(serviceResult.value))
    }

    return res.json(serviceResult.value)
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: any) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
