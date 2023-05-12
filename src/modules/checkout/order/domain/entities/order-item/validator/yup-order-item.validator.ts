import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidQuantitySizeError, InvalidQuantityTypeError, InvalidUnitPriceTypeError, NegativeQuantityValueError, QuantityNotProvidedError } from "../errors";

export class YupOrderItemValidator extends YupValidatorProvider implements DomainValidator<YupOrderItemValidator.ValidateFields>{

    schema = yup.object({

        quantity: yup.number()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidQuantityTypeError()))
            .integer(YupErrorAdapter.toYupFormat(new InvalidQuantityTypeError()))
            .positive(YupErrorAdapter.toYupFormat(new NegativeQuantityValueError()))
            .required(YupErrorAdapter.toYupFormat(new QuantityNotProvidedError()))
            .max(5, YupErrorAdapter.toYupFormat(new InvalidQuantitySizeError(5))),
        
        unitPrice: yup.number()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidUnitPriceTypeError()))
    });

    validate(props: YupOrderItemValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupOrderItemValidator {
    export type ValidateFields = {
        quantity: number
        unitPrice: number
    }
    
}
