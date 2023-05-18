import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupAnnounceValidator } from "./yup-announce-validator";

export class AnnounceValidatorFactory {
    static create(): DomainValidator<YupAnnounceValidator.ValidateFields>{
        return new YupAnnounceValidator()
    }
}