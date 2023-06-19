import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SignupUsecaseInterface extends UsecaseInterface {
    execute(input: SignupUsecaseInterface.InputDto): Promise<Either<Error[], any>>
}

export namespace SignupUsecaseInterface {
    export type InputDto = {
        username: string
        email: string
        password: string
    }

    export type OutputDto = {
        userId: string
        email: string
    }
}