import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAnnounceUsecaseFactory, ActivateAnnounceUsecaseFactory  } from "@core/domain/dist/src/modules/announce/announce-admin/factories"
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';

@Controller('announces')
export class AnnouncesController {
  constructor() {}
//
  @Post() 
  async create(@Body() createAnnounceDto: any, @Req() req: Request, @Res() res: Response) {
    const createAnnounceUsecase = CreateAnnounceUsecaseFactory.create()
    const usecaseResult = await createAnnounceUsecase.execute({ 
      ...createAnnounceDto,
      userId: req.currentUser.id,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.json(usecaseResult.value)
  }

  @Post("/activate/:announceId")
  async activateCategory( @Param('announceId') announceId: string, @Res() res: Response) {
    const activateAnnounceUsecase = ActivateAnnounceUsecaseFactory.create()
    const usecaseResult = await activateAnnounceUsecase.execute({
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }
}
