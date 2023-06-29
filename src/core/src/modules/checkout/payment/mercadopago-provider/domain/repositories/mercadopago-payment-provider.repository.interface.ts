import { MercadopagoPaymentProviderEntity } from "../entities";

export interface MercadopagoPaymentProviderRepositoryInterface {
    create(mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity): Promise<void>
    findById(id: string): Promise<MercadopagoPaymentProviderEntity | null>
    findByMercadopagoPaymentId(mercadopagoPaymentId: string): Promise<MercadopagoPaymentProviderEntity | null>
    update(mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity): Promise<void>
}