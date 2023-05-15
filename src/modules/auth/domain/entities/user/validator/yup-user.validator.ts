import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidUsernameTypeError } from "../errors";

export class YupUserValidator extends YupValidatorProvider implements DomainValidator<YupUserValidator.ValidateFields>{

    schema = yup.object({

        username: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidUsernameTypeError()))
        //     .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
        //     .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
        //     .max(255, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),
        
    
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
