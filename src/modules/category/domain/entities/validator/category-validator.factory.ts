import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupCategoryValidator } from "./yup-category.validator";

export class CategoryValidatorFactory {
    static create(): DomainValidator<YupCategoryValidator.ValidateFields>{
        return new YupCategoryValidator()
    }
}