export class MercadopagoPaymentProviderAlreadyCreatedError extends Error {
    constructor() {
      super(`Mercadopago payment provider already was created`);
      this.name = this.constructor.name
    }
  }