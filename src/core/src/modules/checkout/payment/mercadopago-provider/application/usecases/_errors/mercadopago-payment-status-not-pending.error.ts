export class MercadopagoPaymentStatusNotPendingError extends Error {
    constructor() {
      super(`Mercadopago payment status is not pending`);
      this.name = this.constructor.name
    }
  }