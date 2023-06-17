import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { 
  CreateAnnounceInfoUsecaseFactory,
  ChangeAnnounceInfoTitleUsecaseFactory,
  ChangeAnnounceInfoDescriptionUsecaseFactory
} from "@core/domain/dist/src/modules/announce/announce-info/factories"
import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';

@Controller('announce-info')
export class AnnounceInfoController {
  
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createAnnounceInfoDto: any, @Res() res: Response) {
    const usecase = CreateAnnounceInfoUsecaseFactory.create()
    const result = await usecase.execute({
      ...createAnnounceInfoDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-title/:announceInfoId")
  async changeTitle(@Param('announceInfoId') announceInfoId: string, @Body() changeDto: any, @Res() res: Response) {
    const usecase = ChangeAnnounceInfoTitleUsecaseFactory.create()
    const result = await usecase.execute({
      ...changeDto,
      announceInfoId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-description/:announceInfoId")
  async changeDescription(@Param('announceInfoId') announceInfoId: string, @Body() changeDto: any, @Res() res: Response) {
    const usecase = ChangeAnnounceInfoDescriptionUsecaseFactory.create()
    const result = await usecase.execute({
      ...changeDto,
      announceInfoId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
