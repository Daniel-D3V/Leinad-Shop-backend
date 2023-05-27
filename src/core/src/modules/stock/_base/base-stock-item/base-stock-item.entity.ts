import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { BaseStockItemValidatorFactory } from "./validator"

export abstract class BaseStockItemEntity<T> extends BaseEntity<BaseStockItemEntity.Props & T> {

    constructor(props: BaseStockItemEntity.Props & T, id?: string){
        super(props, id)
    }

    static validateProps(props: BaseStockItemEntity.Props): Either<Error[], null>{
        const validator = BaseStockItemValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }


    abstract toJSON(): Record<string, unknown> 

}


export namespace BaseStockItemEntity  {

    export type Props = {
        price: number
    }           

}