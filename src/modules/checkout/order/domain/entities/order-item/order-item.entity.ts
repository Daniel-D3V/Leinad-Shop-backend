import { BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class OrderItemEntity extends BaseEntity<OrderItemEntity.Props> {

    private constructor(props: OrderItemEntity.Props, id?: string){
        super(props, id)
    }

    static create(props: OrderItemEntity.Input, id?: string): Either<Error[], OrderItemEntity>{
        
        const orderItemEntity = new OrderItemEntity(props, id)
        return right(orderItemEntity)
    }

    toJSON(): OrderItemEntity.PropsJSON {
        return {
            id: this.id,
            productId: this.productId,
            quantity: this.quantity,
            price: this.price
        }
    }

    get productId(): string {
        return this.props.productId
    }
    get quantity(): number {
        return this.props.quantity
    }
    get price(): number {
        return this.props.price
    }
}

export namespace OrderItemEntity {

    export type Input = {
        productId: string
        quantity: number
        price: number
    }

    export type Props = {
        productId: string
        quantity: number
        price: number
    }

    export type PropsJSON = Props & { id: string }
}