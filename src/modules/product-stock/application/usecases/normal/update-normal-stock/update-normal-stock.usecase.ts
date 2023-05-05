import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { UpdateNormalStockInputDto, UpdateNormalStockOutputDto } from "./update-normal-stock.dto";

export class updateNormalStockUsecase implements UsecaseInterface{

    async execute(input: UpdateNormalStockInputDto): Promise<Either<Error[], UpdateNormalStockOutputDto>> {

        

        return right(null)
    }
}