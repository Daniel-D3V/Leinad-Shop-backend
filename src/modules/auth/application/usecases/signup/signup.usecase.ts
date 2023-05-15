import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { SignupInputDto } from "./signup.dto";
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { EmailInUseError } from "./errors";
import { UserEntity } from "@/modules/auth/domain/entities";

export class SignupUsecase implements UsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface
    ){}

    async execute({ email, password, username }: SignupInputDto): Promise<Either<Error[], any>> {
        
        const userEntity = UserEntity.create({ email, password, username })
        if(userEntity.isLeft()) return left(userEntity.value)

        const userFoundByEmail = await this.userRepository.findByEmail(email)
        if(userFoundByEmail) return left([ new EmailInUseError() ])

        await this.userRepository.create(userEntity.value)

        return right(null)
    }
}