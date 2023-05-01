import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { ProductStockNormalValidatorFactory } from "./validator"

export class ProductStockNormalEntity extends BaseEntity<ProductStockNormalEntity.Props> {

    private constructor(props: ProductStockNormalEntity.Props, id: string){
        super(props, id)
    }

    static validateProps(props: ProductStockNormalEntity.Input): Either<Error[], null>{
        const validator = ProductStockNormalValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }

    static create(input: ProductStockNormalEntity.Input, id: string): Either<Error[], ProductStockNormalEntity>{

        const validationResult = this.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const productStockNormalEntity = new ProductStockNormalEntity({
            ...input
        }, id)
        return right(productStockNormalEntity)
    }

    updateStock(newStock: number): Either<Error[], number>{
        const validationResult = ProductStockNormalEntity.validateProps({ stock: newStock })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.stock = newStock
        return right(newStock)
    }

    decreaseOne(): Either<Error[], number>{
        const decreasedStock = this.getCurrentStock() - 1
        return this.updateStock(decreasedStock)
    }
    
    getCurrentStock(): number {
        return this.props.stock
    }

    toJSON(): ProductStockNormalEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock()
        }
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