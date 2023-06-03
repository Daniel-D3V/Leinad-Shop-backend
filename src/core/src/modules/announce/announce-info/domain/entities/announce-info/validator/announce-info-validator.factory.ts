import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupAnnounceInfoValidator } from "./yup-announce-info-validator";

export class AnnounceInfoValidatorFactory {
    static create(): DomainValidator<YupAnnounceInfoValidator.ValidateFields>{
        return new YupAnnounceInfoValidator()
    }
}