import { ChatDeliveryEntity } from "./chat.entity"

describe("Test ChatDeliveryEntity", () => {
    let sut: ChatDeliveryEntity
    let props: ChatDeliveryEntity.Input


    const makeSut = (props: ChatDeliveryEntity.Input) => {
        const chatDeliveryEntityOrError = ChatDeliveryEntity.create(props)
        if (chatDeliveryEntityOrError.isLeft()) throw chatDeliveryEntityOrError.value[0]

        sut = chatDeliveryEntityOrError.value
        return sut
    }

    beforeEach(() => {
        props = {
            customerId: "any_customer_id",
            orderId: "any_order_id",
            salesmanId: "any_salesman_id",
        }

        sut = makeSut(props)
    })

    it('Should create a ChatDeliveryEntity', () => {
        const sut = ChatDeliveryEntity.create(props, "any_id")

        if (sut.isLeft()) throw sut.value[0];

        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            customerId: "any_customer_id",
            orderId: "any_order_id",
            salesmanId: "any_salesman_id",
            status: "PENDINGDELIVERY"
        })
    })

    it('Should check if status is PendingDelivery', () => {
        expect(sut.isPendingDelivery).toBeTruthy();
        expect(sut.status).toBe("PENDINGDELIVERY");
    })

    it('Should change status to Delivered', () => {
        expect(sut.isDelivered()).toBeFalsy();
        sut.deliver();
        expect(sut.isDelivered()).toBeTruthy();
        expect(sut.status).toBe("DELIVERED")
    })

    it('Should change status to Finished', () => {
        expect(sut.isFinished()).toBeFalsy();
        sut.finish();
        expect(sut.isFinished()).toBeTruthy();
        expect(sut.status).toBe("FINISHED")
    })
})