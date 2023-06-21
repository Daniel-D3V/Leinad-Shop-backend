import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateUserActivityUsecaseInterface extends UsecaseInterface {
    execute(input: CreateUserActivityUsecaseInterface.InputDto): Promise<CreateUserActivityUsecaseInterface.OutputDto>
}

export namespace CreateUserActivityUsecaseInterface {

    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}