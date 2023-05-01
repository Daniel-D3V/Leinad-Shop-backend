import { BaseEntity } from "@/modules/@shared/domain"

export class ProductStockEntity extends BaseEntity<ProductStockEntity.Props> {

    private constructor(props: ProductStockEntity.Props, id: string){
        super(props, id)    
    }

    static create(input: ProductStockEntity.Input, id: string): ProductStockEntity {
        const productStockEntity = new ProductStockEntity({
            stockType: "AUTO"
        }, id) 
        return productStockEntity
    }

    toNormal(){
        this.props.stockType = "NORMAL"
    }

    toAuto(){
        this.props.stockType = "AUTO"
    }

    toJSON(): ProductStockEntity.PropsJSON {
        return {
            id: this.id,
            stockType: this.stockType
        }
    }

    get stockType(): ProductStockEntity.StockType {
        return this.props.stockType
    }
}

export namespace ProductStockEntity {

    export type StockType = "NORMAL" | "AUTO"

    export type Input = {} 

    export type Props = {
        stockType: StockType
    }
    export type PropsJSON = Props & { id: string }
}