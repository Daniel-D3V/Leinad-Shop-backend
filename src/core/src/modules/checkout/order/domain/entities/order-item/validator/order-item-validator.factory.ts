import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupOrderItemValidator } from "./yup-order-item.validator";

export class OrderItemValidatorFactory {
    static create(): DomainValidator<YupOrderItemValidator.ValidateFields>{
        return new YupOrderItemValidator()
    }
}