import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupProductStockNormalValidator } from "./yup-product-stock-normal.validator";

export class ProductStockNormalValidatorFactory {
    static create(): DomainValidator<YupProductStockNormalValidator.ValidateFields>{
        return new YupProductStockNormalValidator()
    }
}