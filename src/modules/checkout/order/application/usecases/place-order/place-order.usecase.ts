import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUsecase implements UsecaseInterface {

    async execute(input: PlaceOrderInputDto): Promise<Either<Error[], PlaceOrderOutputDto>> {


        
        return right(null)
    }
}