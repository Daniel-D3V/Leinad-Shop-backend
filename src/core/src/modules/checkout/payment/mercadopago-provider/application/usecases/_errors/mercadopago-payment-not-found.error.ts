export class MercadopagoPaymentNotFoundError extends Error {
    constructor() {
      super(`Mercadopago payment not found`);
      this.name = this.constructor.name
    }
  }