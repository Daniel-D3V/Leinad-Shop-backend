import { formatError } from '@core/domain/dist/src/modules/@shared/utils';
import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from "express";
import { 
  CreateAnnounceUsecaseFactory,
  ChangeAnnounceTypeToItemUsecaseFactory,
  ChangeAnnounceTypeToNormalUsecaseFactory,
  ActivateAnnounceUsecaseFactory,
  BanAnnounceUsecaseFactory,
  DeactivateAnnounceUsecaseFactory
} from "@core/domain/dist/src/modules/announce/announce-management/factories"

import { AuthGuard } from 'src/guards';
import { ApplicationError } from 'src/utils';

@Controller('announces')
export class AnnounceManagementController {
  
  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createAnnounceDto: any, @Req() req: Request, @Res() res: Response) {
    const usecase = CreateAnnounceUsecaseFactory.create()
    const result = await usecase.execute({
      ...createAnnounceDto,
      userId: req.currentUser.id,
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-item/:announceId")
  async changeTypeToItem(@Param('announceId') announceId: string, @Res() res: Response) {
      const usecase = ChangeAnnounceTypeToItemUsecaseFactory.create()
      const result = await usecase.execute({
        announceId
      })
      if (result.isLeft()) {
          throw new ApplicationError(result.value)
      }
      return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-normal/:announceId")
  async changeTypeToNormal(@Param('announceId') announceId: string, @Res() res: Response) {
      const usecase = ChangeAnnounceTypeToNormalUsecaseFactory.create()
      const result = await usecase.execute({
        announceId
      })
      if (result.isLeft()) {
          throw new ApplicationError(result.value)
      }
      return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/activate/:announceId")
  async activate(@Param('announceId') announceId: string, @Res() res: Response) {
      const usecase = ActivateAnnounceUsecaseFactory.create()
      const result = await usecase.execute({
        announceId
      })
      if (result.isLeft()) {
          throw new ApplicationError(result.value)
      }
      return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/deactivate/:announceId")
  async deactivate(@Param('announceId') announceId: string, @Res() res: Response) {
      const usecase = DeactivateAnnounceUsecaseFactory.create()
      const result = await usecase.execute({
        announceId
      })
      if (result.isLeft()) {
          throw new ApplicationError(result.value)
      }
      return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/ban/:announceId")
  async ban(@Param('announceId') announceId: string, @Res() res: Response) {
      const usecase = BanAnnounceUsecaseFactory.create()
      const result = await usecase.execute({
        announceId
      })
      if (result.isLeft()) {
          throw new ApplicationError(result.value)
      }
      return res.status(200).json()
  }
}
