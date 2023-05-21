import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetCategoryParentUsecaseInterface extends UsecaseInterface {
    execute(data: SetCategoryParentUsecaseInterface.InputDto): Promise<SetCategoryParentUsecaseInterface.OutputDto>;
}

export namespace SetCategoryParentUsecaseInterface {
    export type InputDto = {
        categoryId: string;
        parentId: string
    }

    export type OutputDto = Either<Error[], null> 
}