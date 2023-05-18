import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { SignupInputDto } from "./signup.dto";
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { EmailInUseError, UsernameInUseError } from "./errors";
import { UserEntity } from "@/modules/auth/domain/entities";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { UserSignupEvent } from "./user-signup.event";

export class SignupUsecase implements UsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ email, password, username }: SignupInputDto): Promise<Either<Error[], any>> {
        
        const userEntity = UserEntity.create({ email, password, username })
        if(userEntity.isLeft()) return left(userEntity.value)

        const userFoundByUsername = await this.userRepository.findByUsername(username)
        if(userFoundByUsername) return left([ new UsernameInUseError() ])

        const userFoundByEmail = await this.userRepository.findByEmail(email)
        if(userFoundByEmail) return left([ new EmailInUseError() ])

        await this.userRepository.create(userEntity.value)

        const userSignupEvent = new UserSignupEvent({
            ...userEntity.value.toJSON()
        })
        await this.eventEmitter.emit(userSignupEvent)

        return right(null)
    }
}