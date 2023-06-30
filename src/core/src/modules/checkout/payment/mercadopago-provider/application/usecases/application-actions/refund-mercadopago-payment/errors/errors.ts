export class MercadopagoPaymentProviderIsAlreadyRefundedError extends Error {
    constructor() {
      super(`Mercadopago payment provider is already refunded`);
      this.name = this.constructor.name
    }
}

