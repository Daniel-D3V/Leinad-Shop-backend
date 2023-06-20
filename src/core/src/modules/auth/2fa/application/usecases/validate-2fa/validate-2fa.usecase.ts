import { EventEmitterInterface } from "@/modules/@shared/events";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { Validate2faUsecaseInterface } from "../../../domain/usecases";
import { TwoFactorAuthenticationManagementInterface } from "../../protocols";
import { left, right } from "@/modules/@shared/logic";
import { Invalid2faCodeError, TwoFactorNotFoundError } from "../_errors";
import { TwoFactorAuthenticationValidatedEvent } from "./2fa-validated.event";
import { TwoFactorIsAlreadyValidError } from "./errors";


export class Validate2faUsecase implements Validate2faUsecaseInterface {

    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ code, userId }: Validate2faUsecaseInterface.InputDto): Promise<Validate2faUsecaseInterface.OutputDto> {
        
        const twoFactorAuthenticationEntity = await this.twoFactorAuthenticationRepository.findByUserId(userId)
        if(!twoFactorAuthenticationEntity) return left([ new TwoFactorNotFoundError() ])

        if(twoFactorAuthenticationEntity.isValid()) return left([ new TwoFactorIsAlreadyValidError() ])

        const isCodeValid = await this.twoFactorAuthenticationManagement.verify2fa({
            code,
            secret: twoFactorAuthenticationEntity.secret
        })
        if(!isCodeValid) return left([ new Invalid2faCodeError() ])

        twoFactorAuthenticationEntity.validate()

        await this.twoFactorAuthenticationRepository.update(twoFactorAuthenticationEntity)

        const twoFactorAuthenticationValidatedEvent = new TwoFactorAuthenticationValidatedEvent({
            twoFactorAuthenticationId: twoFactorAuthenticationEntity.id
        })
        await this.eventEmitter.emit(twoFactorAuthenticationValidatedEvent)

        return right(null)
    }
}