import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockAutoEntity } from "@/modules/stock/_base";

export class StockNormalAutoEntity extends BaseStockAutoEntity<StockNormalAutoEntity.Props> {

    private constructor(props: StockNormalAutoEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockNormalAutoEntity.Input, id?: string): Either<Error[], StockNormalAutoEntity> {

        const validationResult = StockNormalAutoEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockNormalEntity = new StockNormalAutoEntity({
            ...input
        }, id)
        return right(stockNormalEntity)
    }

    toJSON(): StockNormalAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue(),
            announceNormalId: this.announceNormalId
        }
    }

    get announceNormalId(): string {
        return this.props.announceNormalId
    }

}

export namespace StockNormalAutoEntity {

    export type Input = {
        value: string
        announceNormalId: string
    }

    export type Props = BaseStockAutoEntity.Props & {
        announceNormalId: string
    }
    
    export type PropsJSON = Props & { id: string }
}