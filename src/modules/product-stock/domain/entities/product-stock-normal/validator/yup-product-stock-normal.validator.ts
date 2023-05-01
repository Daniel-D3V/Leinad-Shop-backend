import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidStockSizeError, InvalidStockTypeError, NegativeStockValueError, StockNotProvidedError } from "../errors";

export class YupProductStockNormalValidator extends YupValidatorProvider implements DomainValidator<YupProductStockNormalValidator.ValidateFields>{

    schema = yup.object({

        stock: yup.number()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidStockTypeError()))
            .integer(YupErrorAdapter.toYupFormat(new InvalidStockTypeError()))
            .required(YupErrorAdapter.toYupFormat(new StockNotProvidedError()))
            .positive(YupErrorAdapter.toYupFormat(new NegativeStockValueError()))
            .max(100000000, YupErrorAdapter.toYupFormat(new InvalidStockSizeError(100000000))),
        
    });

    validate(props: YupProductStockNormalValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupProductStockNormalValidator {
    export type ValidateFields = {
        stock: number
    }
    
}
