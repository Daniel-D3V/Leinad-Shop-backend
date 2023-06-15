import { mock } from "jest-mock-extended";
import { PaymentEntity } from "../../../domain/entities";
import { MercadopagoGateway } from "./mercadopago.gateway";


describe('Test MercadoPagoGateway', () => {

    let sut: MercadopagoGateway;
    let paymentEntity: PaymentEntity


    beforeEach(() => {

        paymentEntity = mock<PaymentEntity>()
        sut = new MercadopagoGateway()
    })


    it("Should generate a payment", async () => {
            
        const response = await sut.generatePayment(paymentEntity)
        
    })//dsdfsdfsd/////////////
})