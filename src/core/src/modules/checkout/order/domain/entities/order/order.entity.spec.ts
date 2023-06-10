import { DomainValidator } from "@/modules/@shared/domain/validator"
import { OrderEntity } from "./order.entity"
import { OrderValidatorFactory } from "./validator";
import { mockDomainValidator } from "@/modules/@shared/tests";
import { OrderItemEntity } from "../order-item/order-item.entity";

jest.mock("./validator")

const makeOrderItemEntity = (props: OrderItemEntity.Input) => {
    return OrderItemEntity.create({
        ...props
    }).value as OrderItemEntity
}

describe('Test OrderEntity', () => {

    let sut: OrderEntity
    let props: OrderEntity.Input
    let domainValidator: DomainValidator<any>
    let id: string
    let orderItemEntityProps: OrderItemEntity.Input
    
    beforeEach(() => {

        domainValidator = mockDomainValidator()
        jest.spyOn(OrderValidatorFactory, "create").mockReturnValue(domainValidator)

        id = "any_id"
        orderItemEntityProps = {
            productId: "any_product_id",
            quantity: 1,
            unitPrice: 1,
            productType: "NORMAL"
        }
        props = {
            customerId: "any_customer_id"
        }
        sut = OrderEntity.create(props, id).value as OrderEntity
    })

    it("Should create an instance of OrderEntity", () => {
        sut = OrderEntity.create(props, id).value as OrderEntity
        
        expect(sut).toBeInstanceOf(OrderEntity)
        expect(sut.toJSON()).toEqual({
            ...props,
            id,
            status: "PENDINGPAYMENT",
            orderItems: []
        })
    })

    it("Should cancel the Order", () => {
        expect(sut.status).toBe("PENDINGPAYMENT")
        sut.cancel()
        expect(sut.status).toBe("CANCELLED")
    })

    it("Should process the Order", () => {
        expect(sut.status).toBe("PENDINGPAYMENT")
        sut.process()
        expect(sut.status).toBe("PROCESSED")
    })

    it("Should calculate the total from order", () => {
        const orderItemEntity1 = makeOrderItemEntity(orderItemEntityProps)
        const orderItemEntity2 = makeOrderItemEntity(orderItemEntityProps)
        const orderItemEntity3 = makeOrderItemEntity({...orderItemEntityProps, unitPrice: 1.6})
        sut = OrderEntity.create({
            ...props,
            orderItems: [orderItemEntity1, orderItemEntity2, orderItemEntity3]
        }, id).value as OrderEntity

        expect(sut.getTotal()).toBe(3.6)
    })

    it("Should get total order quantity", () => {
        const orderItemEntity1 = makeOrderItemEntity(orderItemEntityProps)
        const orderItemEntity2 = makeOrderItemEntity(orderItemEntityProps)
        const orderItemEntity3 = makeOrderItemEntity({...orderItemEntityProps, quantity: 3})
        sut = OrderEntity.create({
            ...props,
            orderItems: [orderItemEntity1, orderItemEntity2, orderItemEntity3]
        }, id).value as OrderEntity

        expect(sut.getTotalQuantity()).toBe(5)
    })

    it("Should find orderItem by productId", () => {
        const orderItemEntity1 = makeOrderItemEntity(orderItemEntityProps)
        const orderItemEntity2 = makeOrderItemEntity({...orderItemEntityProps, productId: "any_other_product_id_1"})
        const orderItemEntity3 = makeOrderItemEntity({...orderItemEntityProps, productId: "any_other_product_id_2"})
        sut = OrderEntity.create({
            ...props,
            orderItems: [orderItemEntity1, orderItemEntity2, orderItemEntity3]
        }, id).value as OrderEntity

        expect(sut.findOrderItem("any_other_product_id_1")).toBe(orderItemEntity2)
        expect(sut.findOrderItem("any_other_product_id_2")).toBe(orderItemEntity3)
    })
})