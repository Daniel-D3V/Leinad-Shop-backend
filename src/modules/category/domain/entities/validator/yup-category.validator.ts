import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';

type ValidateFields = {
    username: string
}

export class YupCategoryValidator extends YupValidatorProvider implements DomainValidator<YupCategoryValidator.ValidateFields>{

    schema = yup.object({
        // username: yup.string()
        // .typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameFormatError()))
        // .required(YupErrorAdapter.toYupFormat(new UsernameNotProvidedError()))
        // .min(5, YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
        // .max(50, YupErrorAdapter.toYupFormat(new InvalidUsernameLengthError(5,50)))
    });

    validate(props: YupCategoryValidator.ValidateFields): Either<Error[], null> {
        const errors: Error[] = []

        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) errors.push(...schemaValid.value)
        if(errors.length > 0) return left(errors)
        return right(null)
    }
}

export namespace YupCategoryValidator {
    export type ValidateFields = {
        username: string
    }
    
}
