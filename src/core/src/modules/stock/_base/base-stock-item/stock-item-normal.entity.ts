import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockNormalEntity } from "@/modules/stock/_base";

export class StockItemNormalEntity extends BaseStockNormalEntity<StockItemNormalEntity.Props> {

    private constructor(props: StockItemNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemNormalEntity.Input, id?: string): Either<Error[], StockItemNormalEntity> {

        const validationResult = StockItemNormalEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemNormalEntity = new StockItemNormalEntity({
            ...input
        }, id)
        return right(stockItemNormalEntity)
    }

    toJSON(): StockItemNormalEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            stockItemId: this.stockItemId
        }
    }

    get stockItemId(): string {
        return this.props.stockItemId
    }

}

export namespace StockItemNormalEntity {

    export type Input = { 
        stock: number
        stockItemId: string
    }

    export type Props = BaseStockNormalEntity.Props & {
        stockItemId: string
    }
    
    export type PropsJSON = Props & { id: string }
}