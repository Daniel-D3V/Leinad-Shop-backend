import { right } from "@/modules/@shared/logic";
import { Generate2faUsecaseInterface } from "../../../domain/usecases";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { TwoFactorAuthenticationManagementInterface } from "../../protocols";

export class Generate2faUsecase implements Generate2faUsecaseInterface {

    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface
    ){}

   async execute({ userId }: Generate2faUsecaseInterface.InputDto): Promise<Generate2faUsecaseInterface.OutputDto> {
        
        

        const { qrCode, secret } = await this.twoFactorAuthenticationManagement.generate2fa()

        return right({
            secret,
            qrCode
        })
    }
}