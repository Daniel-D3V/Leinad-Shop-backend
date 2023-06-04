import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockAutoEntity } from "@/modules/stock/_base";

export class StockItemAutoEntity extends BaseStockAutoEntity<StockItemAutoEntity.Props> {

    private constructor(props: StockItemAutoEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemAutoEntity.Input, id?: string): Either<Error[], StockItemAutoEntity> {

        const validationResult = StockItemAutoEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemAutoEntity = new StockItemAutoEntity({
            ...input
        }, id)
        return right(stockItemAutoEntity)
    }

    toJSON(): StockItemAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue(),
            stockItemManagementId: this.stockItemManagementId
        }
    }

    get stockItemManagementId(): string {
        return this.props.stockItemManagementId
    }

}

export namespace StockItemAutoEntity {

    export type Input = {
        value: string
        stockItemManagementId: string
    }

    export type Props = BaseStockAutoEntity.Props & {
        stockItemManagementId: string
    }
    
    export type PropsJSON = Props & { id: string }
}