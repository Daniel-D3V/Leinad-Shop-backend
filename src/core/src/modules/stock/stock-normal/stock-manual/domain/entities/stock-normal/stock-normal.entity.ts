import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockNormalEntity } from "@/modules/stock/_base";

export class StockNormalEntity extends BaseStockNormalEntity<StockNormalEntity.Props> {

    private constructor(props: StockNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockNormalEntity.Props, id?: string): Either<Error[], StockNormalEntity> {

        const validationResult = StockNormalEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockNormalEntity = new StockNormalEntity({
            ...input
        }, id)
        return right(stockNormalEntity)
    }

    toJSON(): StockNormalEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            announceId: this.announceId
        }
    }

    get announceId(): string {
        return this.props.announceId
    }

}

export namespace StockNormalEntity {

    export type Props = BaseStockNormalEntity.Props & {
        announceId: string
    }
    
    export type PropsJSON = Props & { id: string }
}