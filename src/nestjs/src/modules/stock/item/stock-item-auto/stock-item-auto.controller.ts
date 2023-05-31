import { Body, Controller, Delete, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express"
import { ApplicationError } from "src/utils"
import { AuthGuard } from 'src/guards';
import { 
    AddStockItemAutoUsecaseFactory,
    ChangeStockItemAutoValueUsecaseFactory,
    DeleteStockItemAutoUsecaseFactory
} from "@core/domain/dist/src/modules/stock/stock-item/factories"

@Controller('stock-item-auto')
export class StockItemAutoController {

  @UseGuards(new AuthGuard())
  @Post("/add")
  async add( @Body() addDto: any, @Res() res: Response) {
    const addStockItemAutoUsecaseFactory = AddStockItemAutoUsecaseFactory.create();
    const usecaseResult = await addStockItemAutoUsecaseFactory.execute({
        ...addDto,
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json(usecaseResult.value);
  }

  @UseGuards(new AuthGuard())
  @Delete("/:stockItemAutoId")
  async changeValue( @Param('stockItemAutoId') stockItemAutoId: string, @Res() res: Response) {
    const deleteStockItemAutoUsecaseFactory = DeleteStockItemAutoUsecaseFactory.create();
    const usecaseResult = await deleteStockItemAutoUsecaseFactory.execute({
      stockItemAutoId,
    });
    if (usecaseResult.isLeft()) {
      throw new ApplicationError(usecaseResult.value)
    }

    return res.json();
  }

}
