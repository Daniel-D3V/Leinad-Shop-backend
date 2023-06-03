import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockManualEntity } from "@/modules/stock/_base";

export class StockItemManualEntity extends BaseStockManualEntity<StockItemManualEntity.Props> {

    private constructor(props: StockItemManualEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemManualEntity.Input, id?: string): Either<Error[], StockItemManualEntity> {

        const validationResult = StockItemManualEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemNormalEntity = new StockItemManualEntity({
            ...input
        }, id)
        return right(stockItemNormalEntity)
    }

    toJSON(): StockItemManualEntity.PropsJSON {
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

export namespace StockItemManualEntity {

    export type Input = { 
        stock: number
        stockItemId: string
    }

    export type Props = BaseStockManualEntity.Props & {
        stockItemId: string
    }
    
    export type PropsJSON = Props & { id: string }
}