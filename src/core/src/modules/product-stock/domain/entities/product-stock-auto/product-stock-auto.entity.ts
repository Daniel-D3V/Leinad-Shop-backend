import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockAutoValidatorFactory } from "./validator";

export class ProductStockAutoEntity extends BaseEntity<ProductStockAutoEntity.Props> {

    private constructor(props: ProductStockAutoEntity.Props, id?: string) {
        super(props, id);
    }

    static validateProps(props: Omit<ProductStockAutoEntity.Input, "productStockId">): Either<Error[], null>{
        const validator = ProductStockAutoValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }

    static create(input: ProductStockAutoEntity.Input, id?: string): Either<Error[], ProductStockAutoEntity>{
        
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
            productStockId: this.productStockId,
            value: this.getValue()
        }
    }

    get productStockId(): string {
        return this.props.productStockId
    }
}

export namespace ProductStockAutoEntity {
    export type Input = {
        productStockId: string
        value: string
    }
    export type Props = {
        productStockId: string
        value: string
    }
    export type PropsJSON = Props & { id: string }
}