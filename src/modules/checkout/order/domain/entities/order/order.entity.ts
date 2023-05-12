import { AggregateRoot, BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { OrderItemEntity } from "../order-item/order-item.entity";

export class OrderEntity extends BaseEntity<OrderEntity.Props> implements AggregateRoot{

    private constructor(props: OrderEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: OrderEntity.Input, id?: string):Either<Error[], OrderEntity> {
        
        const orderEntity = new OrderEntity({
            ...input,
            status: "PENDINGPAYMENT",
            orderItems: input.orderItems || []
        }, id)
        return right(orderEntity)
    }

    cancel(): void {
        this.props.status = "CANCELLED"
    }
    process(): void {
        this.props.status = "PROCESSED"
    }

    getTotal(): number {
        return this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0)
    }

    getTotalQuantity(): number {
        return this.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0)
    }

    findOrderItem(productId: string): OrderItemEntity | undefined {
        return this.orderItems.find(orderItem => orderItem.productId === productId)
    }

    toJSON(): OrderEntity.PropsJSON {
        return {
            id: this.id,
            customerId: this.customerId,
            status: this.status,
            orderItems: this.orderItems.map(orderItem => orderItem.toJSON())
        }
    }

    get customerId(): string {
        return this.props.customerId
    }
    get status(): OrderEntity.Status {
        return this.props.status
    }
    get orderItems(): OrderItemEntity[] {
        return this.props.orderItems
    }
}

export namespace OrderEntity {
    
    export type Status = "PENDINGPAYMENT" | "CANCELLED" | "PROCESSED"

    export type Input = {
        customerId: string
        orderItems?: OrderItemEntity[]
    }

    export type Props = {
        customerId: string
        status: Status
        orderItems: OrderItemEntity[]
    }

    export type PropsJSON = Omit<Props, "orderItems"> & { id: string, orderItems: OrderItemEntity.PropsJSON[] }
}