import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockNormalEntity } from "@/modules/stock/_base";

export class ItemStockNormalEntity extends BaseStockNormalEntity<ItemStockNormalEntity.Props> {

    private constructor(props: ItemStockNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: ItemStockNormalEntity.Input, id?: string): Either<Error[], ItemStockNormalEntity> {

        const validationResult = ItemStockNormalEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const itemStockNormalEntity = new ItemStockNormalEntity({
            ...input
        }, id)
        return right(itemStockNormalEntity)
    }

    toJSON(): ItemStockNormalEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            stockItemId: this.stockItemId
        }
    }

    get stockItemId(): string {
        return this.props.stockItemId
    }

}

export namespace ItemStockNormalEntity {

    export type Input = { 
        stock: number
        stockItemId: string
    }

    export type Props = BaseStockNormalEntity.Props & {
        stockItemId: string
    }
    
    export type PropsJSON = Props & { id: string }
}