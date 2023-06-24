import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockManualEntity } from "@/modules/stock/_base";

export class StockNormalManualEntity extends BaseStockManualEntity<StockNormalManualEntity.Props> {

    private constructor(props: StockNormalManualEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: StockNormalManualEntity.Props, id?: string): Either<Error[], StockNormalManualEntity> {

        const validationResult = StockNormalManualEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const stockNormalManualEntity = new StockNormalManualEntity({
            ...input
        }, id)
        return right(stockNormalManualEntity)
    }

    toJSON(): StockNormalManualEntity.PropsJSON {
        return {
            id: this.id,
            stock: this.getCurrentStock(),
            announceNormalId: this.announceNormalId
        }
    }

    get announceNormalId(): string {
        return this.props.announceNormalId
    }

}

export namespace StockNormalManualEntity {

    export type Props = BaseStockManualEntity.Props & {
        announceNormalId: string
    }
    
    export type PropsJSON = Props & { id: string }
}