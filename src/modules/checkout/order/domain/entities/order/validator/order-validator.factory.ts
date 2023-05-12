import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupOrderValidator } from "./yup-order.validator";

export class OrderValidatorFactory {
    static create(): DomainValidator<YupOrderValidator.ValidateFields>{
        return new YupOrderValidator()
    }
}