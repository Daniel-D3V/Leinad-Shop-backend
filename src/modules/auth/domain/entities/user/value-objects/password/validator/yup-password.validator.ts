import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidPasswordFormatError, InvalidPasswordLengthError, InvalidPasswordTypeError, PasswordNotProvidedError } from "../../../errors";

export class YupPasswordValidator extends YupValidatorProvider implements DomainValidator<YupPasswordValidator.ValidateFields>{

    schema = yup.object({

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

    validate(props: YupPasswordValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupPasswordValidator {
    export type ValidateFields = {
        password: string
    }
    
}
