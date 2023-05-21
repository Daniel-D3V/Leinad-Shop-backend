import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface RemoveCategoryParentUsecaseInterface extends UsecaseInterface {
    execute(data: RemoveCategoryParentUsecaseInterface.InputDto): Promise<RemoveCategoryParentUsecaseInterface.OutputDto>;
}

export namespace RemoveCategoryParentUsecaseInterface {
    export type InputDto = {
        categoryId: string;
    }

    export type OutputDto = Either<Error[], null> 
}