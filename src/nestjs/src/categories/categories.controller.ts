import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CreateCategoryFactory, ActivateCategoryFactory, DeactivateCategoryFactory, DeleteCategoryFactory, RemoveCategoryParentFactory, SetCategoryParentFactory } from "@core/domain/dist/src/modules/category/factories"
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
    const activateCategoryUsecase = ActivateCategoryFactory.create()
    const usecaseResult = await activateCategoryUsecase.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @Post("/deactivate/:categoryId")
  async deactivate(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const deactivateCategoryUsecase = DeactivateCategoryFactory.create()
    const usecaseResult = await deactivateCategoryUsecase.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @Post("/set-category-parent/:categoryId")
  async setCategoryParent(@Param('categoryId') categoryId: string, @Body() setParentDto: any, @Res() res: Response) {
    const SetCategoryParentUsecase = SetCategoryParentFactory.create()
    const usecaseResult = await SetCategoryParentUsecase.execute({ ...setParentDto ,categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }


  @Post("/remove-category-parent/:categoryId")
  async removeCategoryParent(@Param('categoryId') categoryId: string, @Body() removeParentDto: any, @Res() res: Response) {
    const removeCategoryParentUsecase = RemoveCategoryParentFactory.create()
    const usecaseResult = await removeCategoryParentUsecase.execute({ ...removeParentDto ,categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }



  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const deleteCategoryUsecase = DeleteCategoryFactory.create()
    const usecaseResult = await deleteCategoryUsecase.execute({ categoryId })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }
}
