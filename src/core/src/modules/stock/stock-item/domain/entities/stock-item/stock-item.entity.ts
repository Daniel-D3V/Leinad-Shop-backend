import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockItemEntity } from "@/modules/stock/_base";

export class StockItemEntity extends BaseStockItemEntity<StockItemEntity.Props> {

    private constructor(props: StockItemEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemEntity.Input, id?: string): Either<Error[], StockItemEntity> {

        const validationResult = StockItemEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemEntity = new StockItemEntity({
            ...input
        }, id)
        return right(stockItemEntity)
    }

    toJSON(): StockItemEntity.PropsJSON {
        return {
            id: this.id,
            price: this.price,
            announceId: this.announceId
        }
    }

    changePrice(price: number): Either<Error[], number> {
        const validationResult = StockItemEntity.validateProps({ price })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.price = price
        return right(price)
    }

    get announceId(): string {
        return this.props.announceId
    }

}

export namespace StockItemEntity {

    export type Input = {
        announceId: string
        price: number
    }

    export type Props = BaseStockItemEntity.Props & {
        announceId: string
    }
    
    export type PropsJSON = Props & { id: string }
}