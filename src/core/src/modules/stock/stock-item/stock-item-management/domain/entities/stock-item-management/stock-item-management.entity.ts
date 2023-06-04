import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class StockItemManagementEntity extends  BaseEntity<StockItemManagementEntity.Props> {

    private constructor(props: StockItemManagementEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemManagementEntity.Input, id?: string): Either<Error[], StockItemManagementEntity> {

        const stockItemManagementEntity = new StockItemManagementEntity({
            ...input,
            stockItemType: "NORMAL"
        }, id)
        return right(stockItemManagementEntity)
    }

    toJSON(): StockItemManagementEntity.PropsJSON {
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
    get stockItemType(): StockItemManagementEntity.StockItemType{
        return this.props.stockItemType
    }

}

export namespace StockItemManagementEntity {

    export type StockItemType = "NORMAL" | "AUTO"

    export type Input = {
        announceItemId: string
    }

    export type Props =  {
        announceItemId: string
        stockItemType: StockItemType
    }
    
    export type PropsJSON = Props & { id: string }
}