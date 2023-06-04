import { BaseEntity } from "@/modules/@shared/domain"

export class StockManagementEntity extends BaseEntity<StockManagementEntity.Props> {

    private constructor(props: StockManagementEntity.Props, id?: string){
        super(props, id)    
    }

    static create(input: StockManagementEntity.Input, id?: string): StockManagementEntity {
        const stockManagementEntity = new StockManagementEntity({
            ...input,
            stockType: "NORMAL"
        }, id) 
        return stockManagementEntity
    }

    toStockNormal(){
        this.props.stockType = "NORMAL"
    }
    toStockAuto(){
        this.props.stockType = "AUTO"
    }
    isStockNormal(): boolean {
        return this.props.stockType === "NORMAL"
    }
    isStockAuto(): boolean {
        return this.props.stockType === "AUTO"
    }



    toJSON(): StockManagementEntity.PropsJSON {
        return {
            id: this.id,
            stockType: this.stockType,
            announceId: this.announceId
        }
    }

    get stockType(): StockManagementEntity.StockType {
        return this.props.stockType
    }

    get announceId(): string {
        return this.props.announceId
    }
}

export namespace StockManagementEntity {

    export type StockType = "NORMAL" | "AUTO" 

    export type Input = {
        announceId: string
    }

    export type Props = {
        stockType: StockType
        announceId: string
    }
    export type PropsJSON = Props & { id: string }
}

