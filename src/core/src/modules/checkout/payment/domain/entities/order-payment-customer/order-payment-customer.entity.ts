import { BaseEntity } from "@/modules/@shared/domain";


export class OrderPaymentCustomerEntity extends BaseEntity<OrderPaymentCustomerEntity.Props> {

    private constructor(props: OrderPaymentCustomerEntity.Props, id: string){
        super(props, id)
    }

    static create(props: OrderPaymentCustomerEntity.Props, id: string): OrderPaymentCustomerEntity {
        const orderPaymentCustomerEntity = new OrderPaymentCustomerEntity(props, id)
        return orderPaymentCustomerEntity
    }

    toJSON(): OrderPaymentCustomerEntity.PropsJSON {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }

    get name(): string {
        return this.props.name
    }
    get email(): string {
        return this.props.email
    }
}


export namespace OrderPaymentCustomerEntity {
    
    export type Input = {
        name: string
        email: string
    }
    export type Props = {
        name: string
        email: string
    }

    export type PropsJSON = Props & { id: string }
}