import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockAutoEntity } from "@/modules/stock/_base";

export class StockAutoEntity extends BaseStockAutoEntity<StockAutoEntity.Props> {

    private constructor(props: StockAutoEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockAutoEntity.Input, id?: string): Either<Error[], StockAutoEntity> {

        const validationResult = StockAutoEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockNormalEntity = new StockAutoEntity({
            ...input
        }, id)
        return right(stockNormalEntity)
    }

    toJSON(): StockAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue(),
            announceId: this.announceId
        }
    }

    get announceId(): string {
        return this.props.announceId
    }

}

export namespace StockAutoEntity {

    export type Input = {
        value: string
        announceId: string
    }

    export type Props = BaseStockAutoEntity.Props & {
        announceId: string
    }
    
    export type PropsJSON = Props & { id: string }
}