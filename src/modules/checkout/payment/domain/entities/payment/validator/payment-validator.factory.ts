import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupPaymentValidator } from "./yup-payment.validator";

export class PaymentValidatorFactory {
    static create(): DomainValidator<YupPaymentValidator.ValidateFields>{
        return new YupPaymentValidator()
    }
}