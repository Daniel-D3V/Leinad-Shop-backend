import { BaseEntity } from "@/modules/@shared/domain"

export class StockNormalManagementEntity extends BaseEntity<StockNormalManagementEntity.Props> {

    private constructor(props: StockNormalManagementEntity.Props, id?: string){
        super(props, id)    
    }

    static create(input: StockNormalManagementEntity.Input, id?: string): StockNormalManagementEntity {
        const stockNormalManagementEntity = new StockNormalManagementEntity({
            ...input,
            stockType: "NORMAL"
        }, id) 
        return stockNormalManagementEntity
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



    toJSON(): StockNormalManagementEntity.PropsJSON {
        return {
            id: this.id,
            stockType: this.stockType,
            announceNormalId: this.announceNormalId
        }
    }

    get stockType(): StockNormalManagementEntity.StockType {
        return this.props.stockType
    }

    get announceNormalId(): string {
        return this.props.announceNormalId
    }
}

export namespace StockNormalManagementEntity {

    export type StockType = "NORMAL" | "AUTO" 

    export type Input = {
        announceNormalId: string
    }

    export type Props = {
        stockType: StockType
        announceNormalId: string
    }
    export type PropsJSON = Props & { id: string }
}

