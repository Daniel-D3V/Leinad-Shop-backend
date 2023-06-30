export class MercadopagoPaymentStatusNotCancelledError extends Error {
    constructor() {
      super(`Mercadopago payment status is not cancelled`);
      this.name = this.constructor.name
    }
}