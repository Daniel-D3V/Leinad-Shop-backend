import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeleteCategoryUsecaseInterface extends UsecaseInterface {
    execute(data: DeleteCategoryUsecaseInterface.InputDto): Promise<DeleteCategoryUsecaseInterface.OutputDto>;
}

export namespace DeleteCategoryUsecaseInterface {
    export type InputDto = {
        categoryId: string
    }

    export type OutputDto = Either<Error[], null> 
}