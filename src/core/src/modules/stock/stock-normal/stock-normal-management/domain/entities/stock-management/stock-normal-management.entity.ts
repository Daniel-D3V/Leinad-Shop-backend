import { BaseEntity } from "@/modules/@shared/domain"

export class StockNormalManagementEntity extends BaseEntity<StockNormalManagementEntity.Props> {

    private constructor(props: StockNormalManagementEntity.Props, id?: string){
        super(props, id)    
    }

    static create(input: StockNormalManagementEntity.Input, id?: string): StockNormalManagementEntity {
        const stockNormalManagementEntity = new StockNormalManagementEntity({
            ...input,
            stockType: "MANUAL"
        }, id) 
        return stockNormalManagementEntity
    }

    toStockManual(){
        this.props.stockType = "MANUAL"
    }
    toStockAuto(){
        this.props.stockType = "AUTO"
    }
    isStockManual(): boolean {
        return this.props.stockType === "MANUAL"
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

    export type StockType = "MANUAL" | "AUTO" 

    export type Input = {
        announceNormalId: string
    }

    export type Props = {
        stockType: StockType
        announceNormalId: string
    }
    export type PropsJSON = Props & { id: string }
}

