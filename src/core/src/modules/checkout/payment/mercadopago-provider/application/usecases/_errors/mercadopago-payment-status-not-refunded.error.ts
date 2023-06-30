export class MercadopagoPaymentStatusNotRefundedError extends Error {
    constructor() {
      super(`Mercadopago payment status is not refunded`);
      this.name = this.constructor.name
    }
}