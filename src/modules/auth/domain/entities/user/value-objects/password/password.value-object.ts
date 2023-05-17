import { ValueObject } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PasswordValidatorFactory } from "./validator";


export class PasswordValueObject extends ValueObject<PasswordValueObject.Props> {

    constructor(props: PasswordValueObject.Props){
        super(props)
    }
    get value(): string {
        return this.props.password
    }

    static create({ password }: PasswordValueObject.Props): Either<Error[], PasswordValueObject> {

        const passwordValidator = PasswordValidatorFactory.create()
        const validationResult = passwordValidator.validate({
            password
        })
        if(validationResult.isLeft()) return left(validationResult.value)

        const hashedPassword = password
        const passwordValueObject = new PasswordValueObject({
            password: hashedPassword
        })
        return right(passwordValueObject)
    }

    comparePassword(plainPassword: string): boolean{
        return true
    }
}

export namespace PasswordValueObject {
    export type Props = {
        password: string
    }
}