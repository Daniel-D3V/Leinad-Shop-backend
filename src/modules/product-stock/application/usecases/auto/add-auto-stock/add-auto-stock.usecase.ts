import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class AddAutoStockUsecase implements UsecaseInterface {

    async execute(input: any): Promise<Either<Error[], any>> {


        
        return right(null)
    }
}