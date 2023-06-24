import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockManualEntity } from "@/modules/stock/_base";

export class StockItemManualEntity extends BaseStockManualEntity<StockItemManualEntity.Props> {

    private constructor(props: StockItemManualEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemManualEntity.Props, id?: string): Either<Error[], StockItemManualEntity> {

        const validationResult = StockItemManualEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemManualEntity = new StockItemManualEntity({
            ...input
        }, id)
        return right(stockItemManualEntity)
    }

    toJSON(): StockItemManualEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            announceItemId: this.announceItemId
        }
    }

    get announceItemId(): string {
        return this.props.announceItemId
    }

}

export namespace StockItemManualEntity {

    export type Props = BaseStockManualEntity.Props & {
        announceItemId: string
    }
    
    export type PropsJSON = Props & { id: string }
}