import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { GetStokAvailabilityInputDto, GetStokAvailabilityOutputDto } from "./get-stock-availability.dto";


export class GetStockAvailabilityUsecase implements UsecaseInterface {

    async execute({ productStockId }: GetStokAvailabilityInputDto): Promise<Either<Error[], GetStokAvailabilityOutputDto>> {
        
        

        return right(10)
    }
}