import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class StockItemManagementEntity extends  BaseEntity<StockItemManagementEntity.Props> {

    private constructor(props: StockItemManagementEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemManagementEntity.Input, id?: string): Either<Error[], StockItemManagementEntity> {

        const stockItemManagementEntity = new StockItemManagementEntity({
            ...input,
            stockItemType: "MANUAL"
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

    changeToTypeManual(): void {
        this.props.stockItemType = "MANUAL"
    }

    changeToTypeAuto(): void {
        this.props.stockItemType = "AUTO"
    }

    isStockTypeManual(): boolean {
        return this.props.stockItemType === "MANUAL"
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

    export type StockItemType = "MANUAL" | "AUTO"

    export type Input = {
        announceItemId: string
    }

    export type Props =  {
        announceItemId: string
        stockItemType: StockItemType
    }
    
    export type PropsJSON = Props & { id: string }
}