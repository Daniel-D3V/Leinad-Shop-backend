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

    export type OneFactor = {
        loginType: "1FA"
        accessToken: string
        refreshToken: string
    }

    export type TwoFactor = {
        loginType: "2FA"
        temporaryToken: string
    }

    export type OutputDto = Either<Error[], OneFactor | TwoFactor  >
}