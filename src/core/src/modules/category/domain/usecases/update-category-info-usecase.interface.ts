import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface UpdateCategoryInfoUsecaseInterface extends UsecaseInterface {
    execute(data: UpdateCategoryInfoUsecaseInterface.InputDto): Promise<UpdateCategoryInfoUsecaseInterface.OutputDto>;
}

export namespace UpdateCategoryInfoUsecaseInterface {
    export type InputDto = {
        categoryId: string
        data: {
            title?: string
            description?: string
        }
    }

    export type OutputDto = Either<Error[], null> 
}