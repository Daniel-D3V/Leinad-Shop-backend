import { MercadopagoPaymentProviderEntity } from "../entities";

export interface MercadopagoPaymentProviderRepositoryInterface {
    create(mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity): Promise<void>
}