import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { AuthGuard } from 'src/guards';
import { 
  CreateAnnounceItemUsecaseFactory,
  ChangeAnnounceItemPriceUsecaseFactory,
  ChangeAnnounceItemTitleUsecaseFactory,
  ChangeAnnounceItemStockTypeToAutoUsecaseFactory,
  ChangeAnnounceItemStockTypeToManualUsecaseFactory
} from "@core/domain/dist/src/modules/announce/announce-types/announce-item/factories"
import { ApplicationError } from 'src/utils';

@Controller('announce-item')
export class AnnounceItemController {

  @UseGuards(new AuthGuard())
  @Post()
  async create(@Body() createAnnounceItemDto: any, @Res() res: Response) {
    const usecase = CreateAnnounceItemUsecaseFactory.create()
    const result = await usecase.execute({
      ...createAnnounceItemDto
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(201).json(result.value)
  }

  @UseGuards(new AuthGuard())
  @Post("/change-price/:announceItemId")
  async changePrice(@Param('announceItemId') announceItemId: string, @Body() inputDto: any, @Res() res: Response) {
    const usecase = ChangeAnnounceItemPriceUsecaseFactory.create()
    const result = await usecase.execute({
      ...inputDto,
      announceItemId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-title/:announceItemId")
  async changeTitle(@Param('announceItemId') announceItemId: string, @Body() inputDto: any, @Res() res: Response) {
    const usecase = ChangeAnnounceItemTitleUsecaseFactory.create()
    const result = await usecase.execute({
      ...inputDto,
      announceItemId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-auto/:announceItemId")
  async changeTypeToAuto(@Param('announceItemId') announceItemId: string, @Res() res: Response) {
    const usecase = ChangeAnnounceItemStockTypeToAutoUsecaseFactory.create()
    const result = await usecase.execute({
      announceItemId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }

  @UseGuards(new AuthGuard())
  @Post("/change-type-to-manual/:announceItemId")
  async changeTypeToNormal(@Param('announceItemId') announceItemId: string, @Res() res: Response) {
    const usecase = ChangeAnnounceItemStockTypeToManualUsecaseFactory.create()
    const result = await usecase.execute({
      announceItemId
    })
    if (result.isLeft()) {
        throw new ApplicationError(result.value)
    }
    return res.status(200).json()
  }
}
