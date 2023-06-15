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
})