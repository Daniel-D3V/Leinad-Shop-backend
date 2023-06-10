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

        if(props.productType === "ITEM") {}
        else if(props.productType === "NORMAL") {}
        else {
            props.productType = "NORMAL"
        }

        const orderItemEntity = new OrderItemEntity(props, id)
        return right(orderItemEntity)
    }


    getTotal(): number {
        return this.quantity * this.unitPrice
    }

    toJSON(): OrderItemEntity.PropsJSON {
        return {
            id: this.id,
            productId: this.productId,
            quantity: this.quantity,
            unitPrice: this.unitPrice,
            productType: this.productType
        }
    }

    get productId(): string {
        return this.props.productId
    }
    get quantity(): number {
        return this.props.quantity
    }
    get unitPrice(): number {
        return this.props.unitPrice
    }
    get productType(): OrderItemEntity.ProductType {
        return this.props.productType
    }
    
}

export namespace OrderItemEntity {

    export type ProductType = "ITEM" | "NORMAL"

    export type Input = {
        productId: string
        quantity: number 
        unitPrice: number
        productType: ProductType
    }                                           
                                                 
    export type Props = {
        productId: string
        quantity: number
        unitPrice: number
        productType: ProductType
    }

    export type PropsJSON = Props & { id: string }
}