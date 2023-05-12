import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupOrderValidator } from "./yup-order.validator";

export class OrderItemValidatorFactory {
    static create(): DomainValidator<YupOrderValidator.ValidateFields>{
        return new YupOrderValidator()
    }
}