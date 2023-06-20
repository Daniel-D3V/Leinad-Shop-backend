import { left, right } from "@/modules/@shared/logic";
import { Generate2faUsecaseInterface } from "../../../domain/usecases";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";
import { TwoFactorAuthenticationManagementInterface } from "../../protocols";
import { UserAlreadyHasTwoFactorError } from "./errors";
import { TwoFactorAuthenticationEntity } from "../../../domain/entities";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { TwoFactorAuthenticationGeneratedEvent } from "./2fa-generated.event";

export class Generate2faUsecase implements Generate2faUsecaseInterface {

    constructor(
        private readonly twoFactorAuthenticationRepository: TwoFactorAuthenticationRepositoryInterface,
        private readonly twoFactorAuthenticationManagement: TwoFactorAuthenticationManagementInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

   async execute({ userId }: Generate2faUsecaseInterface.InputDto): Promise<Generate2faUsecaseInterface.OutputDto> {
        
        const twoFactorExists = await this.twoFactorAuthenticationRepository.findByUserId(userId)
        if(twoFactorExists) return left([ new UserAlreadyHasTwoFactorError() ])
        
        const { qrCode, secret } = await this.twoFactorAuthenticationManagement.generate2fa()

        const twoFactorAuthenticationEntity = TwoFactorAuthenticationEntity.create({
            secret,
            userId,
            isValid: false
        })

        await this.twoFactorAuthenticationRepository.create(twoFactorAuthenticationEntity)

        const twoFactorAuthenticationGeneratedEvent = new TwoFactorAuthenticationGeneratedEvent({
            ...twoFactorAuthenticationEntity.toJSON()
        })
        await this.eventEmitter.emit(twoFactorAuthenticationGeneratedEvent)

        return right({
            secret,
            qrCode
        })
    }
}