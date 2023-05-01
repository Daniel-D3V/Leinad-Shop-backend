import { BaseEntity } from "@/modules/@shared/domain"
import { Either, right } from "@/modules/@shared/logic"

export class ProductStockNormalEntity extends BaseEntity<ProductStockNormalEntity.Props> {

    private constructor(props: ProductStockNormalEntity.Props, id: string){
        super(props, id)
    }

    static create(input: ProductStockNormalEntity.Input, id: string): Either<Error[], ProductStockNormalEntity>{

        const productStockNormalEntity = new ProductStockNormalEntity({
            ...input
        }, id)
        return right(productStockNormalEntity)
    }

    toJSON(): ProductStockNormalEntity.PropsJSON {
        return {
            id: this.id
        }
    }
}


export namespace ProductStockNormalEntity {
    export type Input = {}
    export type Props = {}
    export type PropsJSON = Props & { id: string }
}