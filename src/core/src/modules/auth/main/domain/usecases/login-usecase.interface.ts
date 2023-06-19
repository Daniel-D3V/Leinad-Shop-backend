import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface LoginUsecaseInterface extends UsecaseInterface {
    execute(input: LoginUsecaseInterface.InputDto): Promise<LoginUsecaseInterface.OutputDto>
}

export namespace LoginUsecaseInterface {
    export type InputDto = {
        email: string
        password: string
    }

    export type OutputDto = Either<Error[], {
        accessToken: string
        refreshToken: string
    }>
}