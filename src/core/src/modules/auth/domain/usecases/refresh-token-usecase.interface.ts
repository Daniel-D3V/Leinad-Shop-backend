import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface RefreshTokenUsecaseInterface extends UsecaseInterface {
    execute(input: RefreshTokenUsecaseInterface.InputDto): Promise<RefreshTokenUsecaseInterface.OutputDto>
}

export namespace RefreshTokenUsecaseInterface {
    export type InputDto = {
        refreshToken: string
    }

    export type OutputDto = Either<Error[], {
        accessToken: string
        refreshToken: string
    }>
}