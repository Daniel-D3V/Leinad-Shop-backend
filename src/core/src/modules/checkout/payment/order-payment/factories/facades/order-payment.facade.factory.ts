import { OrderPaymentFacadeInterface } from "../../facades";
import { OrderPaymentFacadeImp } from "../../infra/facades";


export class OrderPaymentFacadeFactory {

    static create(): OrderPaymentFacadeInterface { 

        const orderPaymentFacadeImp = new OrderPaymentFacadeImp(

        )
        return orderPaymentFacadeImp
    }
}