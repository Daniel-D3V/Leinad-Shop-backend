import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupAnnounceItemValidator } from "./yup-announce-item-validator";

export class AnnounceItemValidatorFactory {
    static create(): DomainValidator<YupAnnounceItemValidator.ValidateFields>{
        return new YupAnnounceItemValidator()
    }
}