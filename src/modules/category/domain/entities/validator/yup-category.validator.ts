import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidTitleTypeError } from "../errors";

export class YupCategoryValidator extends YupValidatorProvider implements DomainValidator<YupCategoryValidator.ValidateFields>{

    schema = yup.object({

        title: yup.string()
        .strict(true)
        .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
        
    });

    validate(props: YupCategoryValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupCategoryValidator {
    export type ValidateFields = {
        title: string
        description: string
    }
    
}
