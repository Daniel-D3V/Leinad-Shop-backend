import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CreateCategoryFactory } from "@core/domain/dist/src/modules/category/factories"
import { Response } from "express";
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';

@Controller('categories')
export class CategoriesController {
  constructor() {}

  @Post()
  async create(@Body() createCategoryDto: any, @Res() res: Response) {
    const createCategoryUsecase = CreateCategoryFactory.create()
    const usecaseResult = await createCategoryUsecase.execute(createCategoryDto)
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.json(usecaseResult.value)
  }

  @Get()
  findAll() {

  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: any) {

  }

  @Delete(':id')
  remove(@Param('id') id: string) {

  }
}
