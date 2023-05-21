import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CreateCategoryFactory, ActivateCategoryFactory, DeactivateCategoryFactory, DeleteCategoryFactory } from "@core/domain/dist/src/modules/category/factories"
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

  @Post("/activate/:categoryId")
  async activateCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const activateCategoryFactory = ActivateCategoryFactory.create()
    const usecaseResult = await activateCategoryFactory.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @Post("/deactivate/:categoryId")
  async deactivate(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const deactivateCategoryFactory = DeactivateCategoryFactory.create()
    const usecaseResult = await deactivateCategoryFactory.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }


  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const deleteCategoryFactory = DeleteCategoryFactory.create()
    const usecaseResult = await deleteCategoryFactory.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }
}
