import { mock } from "jest-mock-extended"
import { OrderItemEntity } from "../../order-item/order-item.entity"
import { YupOrderValidator } from "./yup-order.validator"


describe("test YupOrderItemValidator", () => {

    let yupCategoryValidator: YupOrderValidator
    let props: YupOrderValidator.ValidateFields
    let orderItem: OrderItemEntity

    beforeAll(() => {
        yupCategoryValidator = new YupOrderValidator()
    })
    beforeEach(() => {
        orderItem = mock<OrderItemEntity>()
        props = {
            orderItems: []
        }
    })

    describe("Test orderItems", () => {

        it("Should return InvalidOrderItemsTypeError if orderItems provided is not an array", () => {
            props.orderItems = {} as any
            const output = yupCategoryValidator.validate(props)
            expect(output.value![0].name).toBe("InvalidOrderItemsTypeError")
        })

        it("Should return InvalidOrderItemsSizeError invalid orderItems size is given", () => {
            while(props.orderItems.length < 11){
                props.orderItems.push(orderItem)
            }
            const output = yupCategoryValidator.validate(props)
            expect(output.value![0].name).toBe("InvalidOrderItemsSizeError")
        })

        it("Should return UniqueProductIdConstraintError if the product from a orderItem is equals to a productId from other order item", () => {
            while(props.orderItems.length < 2){
                orderItem = mock<OrderItemEntity>({
                    id: "any_id"
                })
                props.orderItems.push(orderItem)
            }
            const output = yupCategoryValidator.validate(props)
            expect(output.value![0].name).toBe("UniqueProductIdConstraintError")
        })

    })

})