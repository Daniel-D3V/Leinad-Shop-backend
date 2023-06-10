import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ActivateCategoryUsecaseInterface extends UsecaseInterface {
    execute(data: ActivateCategoryUsecaseInterface.InputDto): Promise<ActivateCategoryUsecaseInterface.OutputDto>;
}

export namespace ActivateCategoryUsecaseInterface {
    export type InputDto = {
        categoryId: string
    }

    export type OutputDto = Either<Error[], null>
}