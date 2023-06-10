import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { OrderItemValidatorFactory } from "./validator";

export class OrderItemEntity extends BaseEntity<OrderItemEntity.Props> {

    private constructor(props: OrderItemEntity.Props, id?: string){
        super(props, id)
    }

    static create(props: OrderItemEntity.Input, id?: string): Either<Error[], OrderItemEntity>{
        
        const orderItemValidator = OrderItemValidatorFactory.create()
        const isInputValid = orderItemValidator.validate(props)
        if(isInputValid.isLeft()) return left(isInputValid.value)

        const orderItemEntity = new OrderItemEntity(props, id)
        return right(orderItemEntity)
    }


    getTotal(): number {
        return this.quantity * this.unitPrice
    }

    toJSON(): OrderItemEntity.PropsJSON {
        return {
            id: this.id,
            announceId: this.announceId,
            quantity: this.quantity,
            unitPrice: this.unitPrice,
            announceTypeId: this.announceTypeId
        }
    }

    get announceId(): string {
        return this.props.announceId
    }
    get quantity(): number {
        return this.props.quantity
    }
    get unitPrice(): number {
        return this.props.unitPrice
    }
    get announceTypeId(): string {
        return this.props.announceTypeId
    }
    
}

export namespace OrderItemEntity {
                        
    export type Input = {   
        announceId: string      
        announceTypeId: string      
        quantity: number                
        unitPrice: number                   
    }                                           
                                                 
    export type Props = {
        announceId: string
        announceTypeId: string
        quantity: number
        unitPrice: number
    }

    export type PropsJSON = Props & { id: string }
}