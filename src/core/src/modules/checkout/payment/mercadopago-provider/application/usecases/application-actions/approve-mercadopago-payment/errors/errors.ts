export class MercadopagoPaymentProviderIsAlreadyApprovedError extends Error {
    constructor() {
      super(`Mercadopago payment provider is already approved`);
      this.name = this.constructor.name
    }
  }