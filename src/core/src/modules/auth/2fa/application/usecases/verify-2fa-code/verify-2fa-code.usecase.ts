import { left, right } from "@/modules/@shared/logic";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { Verify2faCodeUsecaseInterface } from "../../../domain/usecases";
import { Temporary2faTokenFacadeInterface } from "../../../facades";
import { TwoFactorAuthenticationManagementInterface } from "../../protocols";
import { TemporaryTokenNotFoundError } from "./errors";


export class Verify2faTokenUsecase implements Verify2faCodeUsecaseInterface {

    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface,
        private readonly temporary2faTokenFacade: Temporary2faTokenFacadeInterface
    ){}
    
    async execute({ temporaryToken, code }: Verify2faCodeUsecaseInterface.InputDto): Promise<Verify2faCodeUsecaseInterface.OutputDto> {
        
        const temporaryTokenResult = await this.temporary2faTokenFacade.find(temporaryToken)
        if(!temporaryTokenResult) return left([ new TemporaryTokenNotFoundError() ])

        

        return right(null)
    }
}