import { BasePaymentProviderEntity } from "../../../_base"
import { MercadopagoPaymentProviderEntity } from "../entities"

export type MercadopagoPaymentModel = {
    paymentId: string
    amount: number
    paymentMethod: MercadopagoPaymentProviderEntity.PaymentMethods
    status: BasePaymentProviderEntity.Status
}