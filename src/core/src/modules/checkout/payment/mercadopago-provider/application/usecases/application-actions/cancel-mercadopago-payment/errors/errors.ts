export class MercadopagoPaymentProviderIsAlreadyCancelledError extends Error {
    constructor() {
      super(`Mercadopago payment provider is already cancelled`);
      this.name = this.constructor.name
    }
  }