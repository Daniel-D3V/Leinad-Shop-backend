import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';

export class YupOrderValidator extends YupValidatorProvider implements DomainValidator<YupOrderValidator.ValidateFields>{

    schema = yup.object({

        orderItems: yup.array()
            .strict(true)
        //     .typeError(YupErrorAdapter.toYupFormat(new InvalidQuantityTypeError()))
        //     .integer(YupErrorAdapter.toYupFormat(new InvalidQuantityTypeError()))
        //     .positive(YupErrorAdapter.toYupFormat(new NegativeQuantityValueError()))
        //     .required(YupErrorAdapter.toYupFormat(new QuantityNotProvidedError()))
        //     .max(5, YupErrorAdapter.toYupFormat(new InvalidQuantitySizeError(5))),
        
        // unitPrice: yup.string()
        //     .strict(true)
        //     .typeError(YupErrorAdapter.toYupFormat(new InvalidUnitPriceTypeError()))
    });

    validate(props: YupOrderValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupOrderValidator {
    export type ValidateFields = {
        quantity: number
        unitPrice: number
    }
    
}
