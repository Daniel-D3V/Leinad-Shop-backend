import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupProductStockAutoValidator } from "./yup-product-stock-auto-validator";

export class ProductStockAutoValidatorFactory {
    static create(): DomainValidator<YupProductStockAutoValidator.ValidateFields>{
        return new YupProductStockAutoValidator()
    }
}