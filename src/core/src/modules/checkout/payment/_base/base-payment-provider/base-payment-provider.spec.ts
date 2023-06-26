import { BasePaymentProviderEntity } from "./base-payment-provider.entity"


class BasePaymentProviderEntityStub extends BasePaymentProviderEntity<any> {

    toJSON(): Record<string, unknown> {
        return {
            ...this.props
        }
    }
}

describe("Test BasePaymentProvider", () => {

    let sut: BasePaymentProviderEntityStub
    let props: BasePaymentProviderEntity.Props
    let id: string


    beforeEach(() => {
        id = "any_id"
        props = {
            orderPaymentId: "orderPaymentId",
            status: "PENDING",
            amount: 1
        }
        sut = new BasePaymentProviderEntityStub(props, id)
    })

    it("should be able to create a BasePaymentProviderEntity", () => {
        expect(sut).toBeInstanceOf(BasePaymentProviderEntityStub);
        expect(sut.toJSON()).toEqual(props);
    });

    it("should change status to CANCELLED when cancel() is called", () => {
        sut.cancel();
        expect(sut.status).toBe("CANCELLED");
        expect(sut.isCancelled()).toBe(true);
    });

    it("should change status to APPROVED when approve() is called", () => {
        sut.approve();
        expect(sut.status).toBe("APPROVED");
        expect(sut.isApproved()).toBe(true);
    });

    it("should change status to REFUNDED when refund() is called", () => {
        sut.refund();
        expect(sut.status).toBe("REFUNDED");
        expect(sut.isRefunded()).toBe(true);
    });

    it("should verify if status is PENDING when isPending() is called", () => {
        expect(sut.isPeding()).toBe(true);
    });


})