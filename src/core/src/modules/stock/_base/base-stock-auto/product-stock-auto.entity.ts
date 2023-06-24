import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockAutoValidatorFactory } from "./validator";

export abstract class BaseStockAutoEntity<T> extends BaseEntity<BaseStockAutoEntity.Props & T> {

    constructor(props: BaseStockAutoEntity.Props & T, id?: string) {
        super(props, id);
    }

    static validateProps(props: BaseStockAutoEntity.Props): Either<Error[], null>{
        const validator = ProductStockAutoValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }


    changeValue(newValue: string): Either<Error[], string> {
        const validationResult = BaseStockAutoEntity.validateProps({ value: newValue })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.value = newValue
        return right(this.props.value)
    }

    getValue(): string {
        return this.props.value;
    }

    abstract toJSON(): Record<string, unknown>

}

export namespace BaseStockAutoEntity {

    export type Props = {
        value: string
    }
}