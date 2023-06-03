import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupBaseAnnounceValidator } from "./yup-base-announce-validator";

export class BaseAnnounceValidatorFactory {
    static create(): DomainValidator<YupBaseAnnounceValidator.ValidateFields>{
        return new YupBaseAnnounceValidator()
    }
}