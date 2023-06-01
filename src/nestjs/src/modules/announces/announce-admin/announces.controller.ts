import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChangeAnnouncePriceUsecaseFactory, UpdateAnnounceInfoUsecaseFactory, DeleteAnnounceUsecaseFactory,CreateAnnounceUsecaseFactory, ActivateAnnounceUsecaseFactory, DeactivateAnnounceUsecaseFactory, BanAnnounceUsecaseFactory  } from "@core/domain/dist/src/modules/announce/announce-admin/factories"
import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { AuthGuard } from 'src/guards';

@Controller('announces')
export class AnnouncesController {
  constructor() {}
//
  @UseGuards(new AuthGuard())
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

  @UseGuards(new AuthGuard())
  @Post("/activate/:announceId")
  async activateAnnounce( @Param('announceId') announceId: string, @Res() res: Response) {
    const activateAnnounceUsecase = ActivateAnnounceUsecaseFactory.create()
    const usecaseResult = await activateAnnounceUsecase.execute({
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/deactivate/:announceId")
  async deactivateAnnounce( @Param('announceId') announceId: string, @Res() res: Response) {
    const deactivateAnnounceUsecase = DeactivateAnnounceUsecaseFactory.create()
    const usecaseResult = await deactivateAnnounceUsecase.execute({
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/ban/:announceId")
  async banAnnounce( @Param('announceId') announceId: string, @Res() res: Response) {
    const banAnnounceUsecase = BanAnnounceUsecaseFactory.create()
    const usecaseResult = await banAnnounceUsecase.execute({
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-price/:announceId")
  async changeAnnouncePrice(@Body() ChangePriceDto: any, @Param('announceId') announceId: string, @Res() res: Response) {
    const changeAnnouncePriceUsecase = ChangeAnnouncePriceUsecaseFactory.create()
    const usecaseResult = await changeAnnouncePriceUsecase.execute({
      ...ChangePriceDto,
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Delete("/:announceId")
  async deleteAnnounce(@Param('announceId') announceId: string, @Res() res: Response) {
    const deleteAnnounceUsecase = DeleteAnnounceUsecaseFactory.create()
    const usecaseResult = await deleteAnnounceUsecase.execute({
      announceId,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Patch("update-info/:announceId")
  async updateAnnounceInfo(@Body() updateAnnounceInfoDto: any, @Param('announceId') announceId: string, @Res() res: Response) {
    const updateAnnounceInfoUsecase = UpdateAnnounceInfoUsecaseFactory.create()
    const usecaseResult = await updateAnnounceInfoUsecase.execute({
      announceId,
      data: updateAnnounceInfoDto,
    })
    if(usecaseResult.isLeft()) {
      return res.status(400).json(formatError(usecaseResult.value))
    }
    return res.status(200).json()
  }
}
