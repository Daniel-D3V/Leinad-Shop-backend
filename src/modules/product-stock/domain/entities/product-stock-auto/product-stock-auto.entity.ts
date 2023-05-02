import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockAutoValidatorFactory } from "./validator";

export class ProductStockAutoEntity extends BaseEntity<ProductStockAutoEntity.Props> {

    private constructor(props: ProductStockAutoEntity.Props, id?: string) {
        super(props, id);
    }

    static validateProps(props: ProductStockAutoEntity.Input): Either<Error[], null>{
        const validator = ProductStockAutoValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }

    static create(input: ProductStockAutoEntity.Input, id: string): Either<Error[], ProductStockAutoEntity>{
        
        const validationResult = this.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const productStockAutoEntity = new ProductStockAutoEntity({
            ...input
        }, id)
        return right(productStockAutoEntity)
    }

    changeValue(newValue: string): Either<Error[], string> {
        const validationResult = ProductStockAutoEntity.validateProps({ value: newValue })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.value = newValue
        return right(this.props.value)
    }

    getValue(): string {
        return this.props.value;
    }

    toJSON(): ProductStockAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue()
        }
    }

}

export namespace ProductStockAutoEntity {
    export type Input = {
        value: string
    }
    export type Props = {
        value: string
    }
    export type PropsJSON = Props & { id: string }
}