import { Body, Controller, Delete, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import { CreateAnnounceItemUsecaseFactory,ChangeAnnounceItemPriceUsecaseFactory, ChangeAnnounceItemTitleUsecaseFactory } from "@core/domain/dist/src/modules/announce/announce-item/factories"

@Controller('announce-item')
export class AnnounceItemController {

  @UseGuards(new AuthGuard())
  @Post()
  async add( @Body() createDto: any, @Res() res: Response) {
    const createAnnounceItemUsecaseFactory = CreateAnnounceItemUsecaseFactory.create();
    const usecaseResult = await createAnnounceItemUsecaseFactory.execute({
      ...createDto
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json(usecaseResult.value);
  }

  @UseGuards(new AuthGuard())
  @Post("/change-price/:announceItemId")
  async changePrice( @Param('announceItemId') announceItemId: string,  @Body() createDto: any, @Res() res: Response) {
    const changeAnnounceItemPriceUsecaseFactory = ChangeAnnounceItemPriceUsecaseFactory.create();
    const usecaseResult = await changeAnnounceItemPriceUsecaseFactory.execute({
        announceItemId,
        ...createDto
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

  @UseGuards(new AuthGuard())
  @Post("/change-title/:announceItemId")
  async changeTitle( @Param('announceItemId') announceItemId: string,@Body() createDto: any, @Res() res: Response) {
    const changeAnnounceItemTitleUsecaseFactory = ChangeAnnounceItemTitleUsecaseFactory.create();
    const usecaseResult = await changeAnnounceItemTitleUsecaseFactory.execute({
        announceItemId,
      ...createDto
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }
 
}
