export class MercadopagoPaymentStatusNotApprovedError extends Error {
    constructor() {
      super(`Mercadopago payment status is not approved`);
      this.name = this.constructor.name
    }
}