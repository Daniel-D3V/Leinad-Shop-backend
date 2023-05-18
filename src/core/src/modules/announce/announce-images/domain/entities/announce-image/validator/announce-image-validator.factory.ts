import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupAnnounceImageValidator } from "./yup-announce-image-validator";

export class AnnounceImageValidatorFactory {
    static create(): DomainValidator<YupAnnounceImageValidator.ValidateFields>{
        return new YupAnnounceImageValidator()
    }
}