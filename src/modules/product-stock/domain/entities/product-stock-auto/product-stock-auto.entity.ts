import { BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class ProductStockAutoEntity extends BaseEntity<ProductStockAutoEntity.Props> {

    private constructor(props: ProductStockAutoEntity.Props, id?: string) {
        super(props, id);
    }

    static create(input: ProductStockAutoEntity.Input): Either<Error[], ProductStockAutoEntity>{
        
        const productStockAutoEntity = new ProductStockAutoEntity({
            ...input
        })
        return right(productStockAutoEntity)
    }

    getValue(): string {
        return this.props.value;
    }

    toJSON(): ProductStockAutoEntity.PropsJSON {
        return {
            id: this.id,
            value: this.getValue()
        }
    }

}

export namespace ProductStockAutoEntity {
    export type Input = {
        value: string
    }
    export type Props = {
        value: string
    }
    export type PropsJSON = Props & { id: string }
}