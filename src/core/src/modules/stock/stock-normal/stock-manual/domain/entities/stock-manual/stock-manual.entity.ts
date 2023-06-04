import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockManualEntity } from "@/modules/stock/_base";

export class StockManualEntity extends BaseStockManualEntity<StockManualEntity.Props> {

    private constructor(props: StockManualEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockManualEntity.Props, id?: string): Either<Error[], StockManualEntity> {

        const validationResult = StockManualEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockManualEntity = new StockManualEntity({
            ...input
        }, id)
        return right(stockManualEntity)
    }

    toJSON(): StockManualEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            stockManagementId: this.stockManagementId
        }
    }

    get stockManagementId(): string {
        return this.props.stockManagementId
    }

}

export namespace StockManualEntity {

    export type Props = BaseStockManualEntity.Props & {
        stockManagementId: string
    }
    
    export type PropsJSON = Props & { id: string }
}