import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateCategoryUsecaseInterface extends UsecaseInterface {
    execute(data: CreateCategoryUsecaseInterface.InputDto): Promise<CreateCategoryUsecaseInterface.OutputDto>;
}

export namespace CreateCategoryUsecaseInterface {
    export type InputDto = {
        title: string
        description: string
        parrentId?: string
    }

    export type OutputDto = Either<Error[], { id: string }> 
}