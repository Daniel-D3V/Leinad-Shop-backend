import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidValueLengthError, InvalidValueTypeError, ValueNotProvidedError } from "../errors";

export class YupProductStockAutoValidator extends YupValidatorProvider implements DomainValidator<YupProductStockAutoValidator.ValidateFields>{

    schema = yup.object({

        value: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidValueTypeError()))
            .required(YupErrorAdapter.toYupFormat(new ValueNotProvidedError()))
            .max(1000, YupErrorAdapter.toYupFormat(new InvalidValueLengthError())),
        
    });

    validate(props: YupProductStockAutoValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupProductStockAutoValidator {
    export type ValidateFields = {
        value: string
    }
    
}