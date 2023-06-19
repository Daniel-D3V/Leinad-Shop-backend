import { EventEmitterInterface } from "@/modules/@shared/events";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { VerifyEmailUsecaseInterface } from "../../../domain/usecases";
import { left, right } from "@/modules/@shared/logic";
import { UserNotFoundError } from "../_errors";
import { AuthUserEmailVerifiedEvent } from "./auth-user-email-verified.event";


export class VerifyEmailUsecase implements VerifyEmailUsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ userId }: VerifyEmailUsecaseInterface.InputDto): Promise<VerifyEmailUsecaseInterface.OutputDto> {
        
        const userEntity = await this.userRepository.findById(userId)
        if(!userEntity) return left([ new UserNotFoundError() ])

        userEntity.verifyEmail()
        await this.userRepository.update(userEntity)

        const authUserEmailVerifiedEvent = new AuthUserEmailVerifiedEvent({
            userId: userEntity.id,
        })
        await this.eventEmitter.emit(authUserEmailVerifiedEvent)

        return right(null)
    }
}