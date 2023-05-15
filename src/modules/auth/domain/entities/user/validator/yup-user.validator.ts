import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { EmailNotProvidedError, InvalidEmailFormatError, InvalidEmailLengthError, InvalidEmailTypeError, InvalidPasswordFormatError, InvalidPasswordLengthError, InvalidPasswordTypeError, InvalidUsernameLengthError, InvalidUsernameTypeError, PasswordNotProvidedError, UsernameNotProvidedError } from "../errors";
export class YupUserValidator extends YupValidatorProvider implements DomainValidator<YupUserValidator.ValidateFields>{

    schema = yup.object({

        username: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameTypeError()))
            .required(YupErrorAdapter.toYupFormat(new UsernameNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError()))
            .max(30, YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError())),
        
        email: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidEmailTypeError()))
            .required(YupErrorAdapter.toYupFormat(new EmailNotProvidedError()))
            .email(YupErrorAdapter.toYupFormat(new InvalidEmailFormatError()))
            .max(255, YupErrorAdapter.toYupFormat(new InvalidEmailLengthError())),

        password: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidPasswordTypeError()))
            .required(YupErrorAdapter.toYupFormat(new PasswordNotProvidedError()))
            .min(8, YupErrorAdapter.toYupFormat(new InvalidPasswordLengthError()))
            .max(100, YupErrorAdapter.toYupFormat(new InvalidPasswordLengthError()))
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                YupErrorAdapter.toYupFormat(new InvalidPasswordFormatError())
            )
    });

    validate(props: YupUserValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupUserValidator {
    export type ValidateFields = {
        username: string
        email: string
        password: string
    }
    
}
