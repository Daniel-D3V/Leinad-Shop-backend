import { DomainValidator } from "@/modules/@shared/domain/validator";
import { YupBaseStockItemValidatorFactory } from "./yup-base-stock-item-validator";

export class BaseStockItemValidatorFactory {
    static create(): DomainValidator<YupBaseStockItemValidatorFactory.ValidateFields>{
        return new YupBaseStockItemValidatorFactory()
    }
}