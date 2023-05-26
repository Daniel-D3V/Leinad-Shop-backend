import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { ProductStockNormalValidatorFactory } from "./validator"

export abstract class BaseStockNormalEntity<T> extends BaseEntity<BaseStockNormalEntity.Props> {

    constructor(props: BaseStockNormalEntity.Props, id: string){
        super(props, id)
    }

    static validateProps(props: BaseStockNormalEntity.Input): Either<Error[], null>{
        const validator = ProductStockNormalValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }

    // static create(input: BaseStockNormalEntity.Input, id: string): Either<Error[], BaseStockNormalEntity>{

    //     const validationResult = this.validateProps({ ...input })
    //     if(validationResult.isLeft()) return left(validationResult.value)

    //     const baseStockNormalEntity = new BaseStockNormalEntity({
    //         ...input
    //     }, id)
    //     return right(baseStockNormalEntity)
    // }

    updateStock(newStock: number): Either<Error[], number>{
        const validationResult = BaseStockNormalEntity.validateProps({ stock: newStock })
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

    abstract toJSON(): Record<string, unknown> 

}


export namespace BaseStockNormalEntity  {
    export type Input = {
        stock: number
    }
    export type Props = {
        stock: number
    }

}