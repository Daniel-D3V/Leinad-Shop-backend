import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { OrderItemEntity } from "../../order-item/order-item.entity";
import { InvalidOrderItemsSizeError, InvalidOrderItemsTypeError } from "../errors";

export class YupOrderValidator extends YupValidatorProvider implements DomainValidator<YupOrderValidator.ValidateFields>{

    schema = yup.object({

        orderItems: yup.array()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidOrderItemsTypeError()))
            .max(10, YupErrorAdapter.toYupFormat(new InvalidOrderItemsSizeError(10))),
    });

    validate(props: YupOrderValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupOrderValidator {
    export type ValidateFields = {
        orderItems: OrderItemEntity[]
    }
    
}
