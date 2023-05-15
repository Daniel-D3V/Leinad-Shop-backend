import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UserValidatorFactory } from "./validator";

export class UserEntity extends BaseEntity<UserEntity.Props>{

    private constructor(props: UserEntity.Props, id?: string) {
        super(props, id);
    }

    static create(props: UserEntity.Input, id?: string): Either<Error[], UserEntity> {

        const userValidator = UserValidatorFactory.create()
        const userValidatorResult = userValidator.validate(props)
        if(userValidatorResult.isLeft()) return left(userValidatorResult.value)

        const userEntity = new UserEntity({
            ...props
        }, id) 
        return right(userEntity)
    }

    toJSON(): UserEntity.PropsJSON {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password
        }
    }

    get email(): string {
        return this.props.email;
    }
    get username(): string {
        return this.props.username;
    }
    get password(): string {
        return this.props.password;
    }
}

export namespace UserEntity {
    
    export type Input = {
        username: string
        email: string
        password: string
    }

    export type Props = {
        username: string
        email: string
        password: string
    }

    export type PropsJSON = Props & { id: string }
}