import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockAutoEntity } from "@/modules/stock/_base";

export class ItemStockAutoEntity extends BaseStockAutoEntity<ItemStockAutoEntity.Props> {

    private constructor(props: ItemStockAutoEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: ItemStockAutoEntity.Input, id?: string): Either<Error[], ItemStockAutoEntity> {

        const validationResult = ItemStockAutoEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const itemStockAutoEntity = new ItemStockAutoEntity({
            ...input
        }, id)
        return right(itemStockAutoEntity)
    }

    toJSON(): ItemStockAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue(),
            stockItemId: this.stockItemId
        }
    }

    get stockItemId(): string {
        return this.props.stockItemId
    }

}

export namespace ItemStockAutoEntity {

    export type Input = {
        value: string
        stockItemId: string
    }

    export type Props = BaseStockAutoEntity.Props & {
        stockItemId: string
    }
    
    export type PropsJSON = Props & { id: string }
}