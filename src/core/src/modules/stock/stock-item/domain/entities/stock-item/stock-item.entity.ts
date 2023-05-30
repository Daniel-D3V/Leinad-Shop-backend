import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockItemEntity } from "@/modules/stock/_base";

export class StockItemEntity extends BaseStockItemEntity<StockItemEntity.Props> {

    private constructor(props: StockItemEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemEntity.Input, id?: string): Either<Error[], StockItemEntity> {

        const stockItemEntity = new StockItemEntity({
            ...input,
            stockItemType: "NORMAL"
        }, id)
        return right(stockItemEntity)
    }

    toJSON(): StockItemEntity.PropsJSON {
        return {
            id: this.id,
            announceItemId: this.announceItemId,
            stockItemType: this.stockItemType,
        }
    }

    changeToTypeNormal(): void {
        this.props.stockItemType = "NORMAL"
    }

    changeToTypeAuto(): void {
        this.props.stockItemType = "AUTO"
    }

    isStockTypeNormal(): boolean {
        return this.props.stockItemType === "NORMAL"
    }

    isStockTypeAuto(): boolean {
        return this.props.stockItemType === "AUTO"
    }

    get announceItemId(): string {
        return this.props.announceItemId
    }
    get stockItemType(): StockItemEntity.StockItemType{
        return this.props.stockItemType
    }

}

export namespace StockItemEntity {

    export type StockItemType = "NORMAL" | "AUTO"

    export type Input = {
        announceItemId: string
    }

    export type Props = BaseStockItemEntity.Props & {
        announceItemId: string
        stockItemType: StockItemType
    }
    
    export type PropsJSON = Props & { id: string }
}