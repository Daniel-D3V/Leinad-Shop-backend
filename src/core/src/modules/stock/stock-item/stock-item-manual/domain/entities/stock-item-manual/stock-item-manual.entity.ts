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
            stockItemManagementId: this.stockItemManagementId
        }
    }

    get stockItemManagementId(): string {
        return this.props.stockItemManagementId
    }

}

export namespace StockItemManualEntity {

    export type Props = BaseStockManualEntity.Props & {
        stockItemManagementId: string
    }
    
    export type PropsJSON = Props & { id: string }
}