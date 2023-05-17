import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupPasswordValidator } from "./yup-password.validator";

export class PasswordValidatorFactory {
    static create(): DomainValidator<YupPasswordValidator.ValidateFields>{
        return new YupPasswordValidator()
    }
}