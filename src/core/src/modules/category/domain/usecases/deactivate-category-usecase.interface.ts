import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeactivateCategoryUsecaseInterface extends UsecaseInterface {
    execute(data: DeactivateCategoryUsecaseInterface.InputDto): Promise<DeactivateCategoryUsecaseInterface.OutputDto>;
}

export namespace DeactivateCategoryUsecaseInterface {
    export type InputDto = {
        categoryId: string
    }

    export type OutputDto = Either<Error[], null> 
}