import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
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
}
