import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupMessageValidator } from "./yup-message.validator";

export class MessageValidatorFactory {
    static create(): DomainValidator<YupMessageValidator.ValidateFields> {
        return new YupMessageValidator()
    }
}