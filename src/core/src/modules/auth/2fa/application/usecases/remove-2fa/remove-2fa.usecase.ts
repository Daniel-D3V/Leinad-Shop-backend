import { left, right } from "@/modules/@shared/logic";
import { Remove2faUsecaseInterface } from "../../../domain/usecases";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { TwoFactorNotFoundError } from "../_errors";
import { TwoFactorAuthenticationRemovedEvent } from "./2fa-removed.event";


export class Remove2faUsecase implements Remove2faUsecaseInterface {
    
    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ userId }: Remove2faUsecaseInterface.InputDto): Promise<Remove2faUsecaseInterface.OutputDto> {
        
        const twoFactorAuthenticationEntity = await this.twoFactorAuthenticationRepository.findByUserId(userId)
        if(!twoFactorAuthenticationEntity) return left([ new TwoFactorNotFoundError() ])

        await this.twoFactorAuthenticationRepository.delete(twoFactorAuthenticationEntity.id)

        const twoFactorAuthenticationRemovedEvent = new TwoFactorAuthenticationRemovedEvent({
            twoFactorAuthenticationId: twoFactorAuthenticationEntity.id
        })
        await this.eventEmitter.emit(twoFactorAuthenticationRemovedEvent)

        return right(null)
    }
}