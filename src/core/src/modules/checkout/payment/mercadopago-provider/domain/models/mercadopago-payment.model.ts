import { BasePaymentProviderEntity } from "../../../_base"

export type MercadopagoPaymentModel = {
    paymentId: string
    status: BasePaymentProviderEntity.Status
}