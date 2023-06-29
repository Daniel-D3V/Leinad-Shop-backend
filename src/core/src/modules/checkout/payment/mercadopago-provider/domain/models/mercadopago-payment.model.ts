import { BasePaymentProviderEntity } from "../../../_base"
import { MercadopagoPaymentProviderEntity } from "../entities"

export type MercadopagoPaymentModel = {
    paymentId: string
    orderPaymentId: string
    amount: number
    paymentMethod: MercadopagoPaymentProviderEntity.PaymentMethods
    status: BasePaymentProviderEntity.Status
}

export namespace MercadopagoPaymentModel {
    export type Status = BasePaymentProviderEntity.Status
}