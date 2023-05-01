import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { ProductStockNormalValidatorFactory } from "./validator"

export class ProductStockNormalEntity extends BaseEntity<ProductStockNormalEntity.Props> {

    private constructor(props: ProductStockNormalEntity.Props, id: string){
        super(props, id)
    }

    static create(input: ProductStockNormalEntity.Input, id: string): Either<Error[], ProductStockNormalEntity>{

        const validator = ProductStockNormalValidatorFactory.create()
        const validationResult = validator.validate({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const productStockNormalEntity = new ProductStockNormalEntity({
            ...input
        }, id)
        return right(productStockNormalEntity)
    }

    toJSON(): ProductStockNormalEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.stock
        }
    }

    get stock(): number{
        return this.props.stock
    }
}


export namespace ProductStockNormalEntity {
    export type Input = {
        stock: number
    }
    export type Props = {
        stock: number
    }
    export type PropsJSON = Props & { id: string }
}