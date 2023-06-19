import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { AuthUserModel } from "../models";

export interface GetUserByAccessTokenUsecaseInterface extends UsecaseInterface {
    execute(input: GetUserByAccessTokenUsecaseInterface.InputDto): Promise<GetUserByAccessTokenUsecaseInterface.OutputDto>
}

export namespace GetUserByAccessTokenUsecaseInterface {
    export type InputDto = {
        accessToken: string
    }

    export type OutputDto = Either<Error[], AuthUserModel>
}