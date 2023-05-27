import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockItemEntity } from "@/modules/stock/_base";

export class StockItemEntity extends BaseStockItemEntity<StockItemEntity.Props> {

    private constructor(props: StockItemEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockItemEntity.Input, id?: string): Either<Error[], StockItemEntity> {

        const validationResult = StockItemEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockItemEntity = new StockItemEntity({
            ...input,
            stockItemType: "NORMAL"
        }, id)
        return right(stockItemEntity)
    }

    toJSON(): StockItemEntity.PropsJSON {
        return {
            id: this.id,
            price: this.price,
            title: this.title,
            announceId: this.announceId,
            stockItemType: this.stockItemType,
        }
    }

    changeToTypeNormal(): void {
        this.props.stockItemType = "NORMAL"
    }

    changeToTypeAuto(): void {
        this.props.stockItemType = "AUTO"
    }

    changePrice(price: number): Either<Error[], number> {
        const validationResult = StockItemEntity.validateProps({ 
            ...this.props, 
            price 
        })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.price = price
        return right(price)
    }

    get announceId(): string {
        return this.props.announceId
    }
    get stockItemType(): StockItemEntity.StockItemType{
        return this.props.stockItemType
    }

}

export namespace StockItemEntity {

    export type StockItemType = "NORMAL" | "AUTO"

    export type Input = {
        announceId: string
        title: string
        price: number
    }

    export type Props = BaseStockItemEntity.Props & {
        announceId: string
        stockItemType: StockItemType
    }
    
    export type PropsJSON = Props & { id: string }
}