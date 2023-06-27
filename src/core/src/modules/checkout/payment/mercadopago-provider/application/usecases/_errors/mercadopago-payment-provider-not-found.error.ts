export class MercadopagoPaymentProviderNotFoundError extends Error {
    constructor() {
      super(`Mercadopago payment provider not found`);
      this.name = this.constructor.name
    }
  }