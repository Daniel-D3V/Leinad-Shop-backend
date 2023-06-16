import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response, Request } from "express";
import {  } from "@core/domain/dist/src/modules/announce/announce-management/factories"

@Controller('announce')
export class AnnounceManagementController {
  

  @Post()
  async create(@Body() createCategoryDto: any, @Res() res: Response) {
    // const createCategoryUsecase = CreateCategoryFactory.create()
    // const usecaseResult = await createCategoryUsecase.execute(createCategoryDto)
    // if(usecaseResult.isLeft()) {
    //   return res.status(400).json(formatError(usecaseResult.value))
    // }
    // return res.json(usecaseResult.value)
  }
}
