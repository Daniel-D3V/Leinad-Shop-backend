import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { LoginInputDto, LoginOutputDto } from "./login.dto";
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { InvalidCredentialsError } from "./errors";

export class LoginUsecase implements UsecaseInterface {

    constructor(
        private readonly userRepository: UserRepositoryInterface
    ){}


    async execute({ email, password }: LoginInputDto): Promise<Either<Error[], LoginOutputDto>> {

        const userEntity = await this.userRepository.findByEmail(email)
        if(!userEntity) return left([ new InvalidCredentialsError() ])

        const passwordMatch = userEntity.comparePassword(password)
        if(!passwordMatch) return left([ new InvalidCredentialsError() ])

        

        return right({ 

        })
    }
}