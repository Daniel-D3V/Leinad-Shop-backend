import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UserValidatorFactory } from "./validator";
import { PasswordValueObject } from "./value-objects";

export class UserEntity extends BaseEntity<UserEntity.Props>{

    private constructor(props: UserEntity.Props, id?: string) {
        super(props, id);
    }

    static create(props: UserEntity.Input): Either<Error[], UserEntity> {

        const errors: Error[] = []
        const userValidator = UserValidatorFactory.create()
        const userValidatorResult = userValidator.validate({
            ...props
        })
        if(userValidatorResult.isLeft()) errors.push(...userValidatorResult.value)

        const passwordValueObject = PasswordValueObject.create({ 
            password: props.password 
        })
        if(passwordValueObject.isLeft()) errors.push(...passwordValueObject.value)
        
        if(errors.length > 0) return left(errors)

        const userEntity = new UserEntity({
            ...props,
            password: passwordValueObject.value as PasswordValueObject,
            status: "ACTIVE",
            isEmailVerified: false
        }) 
        return right(userEntity)
    }

    static createExistingUser(props: UserEntity.InputExistingUser, id: string): Either<Error[], UserEntity> {
        const userValidator = UserValidatorFactory.create()
        const userValidatorResult = userValidator.validate({
            ...props
        })
        if(userValidatorResult.isLeft()) return left(userValidatorResult.value)

        const passwordValueObject = new PasswordValueObject({
            password: props.password
        })

        const userEntity = new UserEntity({
            ...props,
            password: passwordValueObject,
            status: "ACTIVE"
        }, id) 
        return right(userEntity)
    }

    comparePassword(plainPassword: string): boolean {
        return this.password.comparePassword(plainPassword)
    }

    ban(): void {
        this.props.status = "BANNED"
    }
    isBanned(): boolean {
        return this.props.status === "BANNED"
    }

    activate(): void {
        this.props.status = "ACTIVE"
    }
    isActivated(): boolean {
        return this.props.status === "ACTIVE"
    }
    
    verifyEmail(): void {
        this.props.isEmailVerified = true
    }

    toJSON(): UserEntity.PropsJSON {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password.value,
            status: this.status,
            isEmailVerified: this.isEmailVerified
        }
    }

    get email(): string {
        return this.props.email;
    }
    get username(): string {
        return this.props.username;
    }
    get password(): PasswordValueObject {
        return this.props.password;
    }
    get status(): UserEntity.Status {
        return this.props.status;
    }
    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }
}

export namespace UserEntity {
    
    export type Status = "ACTIVE" | "BANNED"

    export type Input = {
        username: string
        email: string
        password: string
    }

    export type InputExistingUser = Input & { 
        isEmailVerified: boolean
    }

    export type Props = {
        username: string
        email: string
        password: PasswordValueObject
        status: Status
        isEmailVerified: boolean
    }

    export type PropsJSON = Omit<Props, "password"> & { id: string, password: string }
}