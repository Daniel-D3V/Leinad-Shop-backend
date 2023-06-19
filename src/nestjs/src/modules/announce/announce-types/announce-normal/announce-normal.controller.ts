import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards';
import { 
  CreateAnnounceNormalUsecaseFactory,
  ChangeAnnounceNormalPriceUsecaseFactory
} from "@core/domain/dist/src/modules/announce/announce-types/announce-normal/factories"
import { ApplicationError } from 'src/utils';

@Controller('announce-normal')
export class AnnounceNormalController {

  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createAnnounceNormalDto: any, @Res() res: Response) {
    const usecase = CreateAnnounceNormalUsecaseFactory.create()
    const result = await usecase.execute({
      ...createAnnounceNormalDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-price/:announceNormalId")
  async changePrice(@Param('announceNormalId') announceNormalId: string, @Body() inputDto: any, @Res() res: Response) {
    const usecase = ChangeAnnounceNormalPriceUsecaseFactory.create()
    const result = await usecase.execute({
      announceNormalId,
      ...inputDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
