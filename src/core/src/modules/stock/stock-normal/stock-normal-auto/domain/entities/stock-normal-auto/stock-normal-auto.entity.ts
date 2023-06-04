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
            stockNormalManagementId: this.stockNormalManagementId
        }
    }

    get stockNormalManagementId(): string {
        return this.props.stockNormalManagementId
    }

}

export namespace StockNormalAutoEntity {

    export type Input = {
        value: string
        stockNormalManagementId: string
    }

    export type Props = BaseStockAutoEntity.Props & {
        stockNormalManagementId: string
    }
    
    export type PropsJSON = Props & { id: string }
}