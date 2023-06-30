export class MercadopagoPaymentProviderIsAlreadyApprovedError extends Error {
    constructor() {
      super(`Mercadopago payment provider is already approved`);
      this.name = this.constructor.name
    }
}

export class OrderPaymentNotFoundError extends Error {
  constructor() {
    super(`Order payment was not found `);
    this.name = this.constructor.name
  }
}

export class RefundError extends Error {
  constructor() {
    super(`error in refunding payment `);
    this.name = this.constructor.name
  }
}

export class PaymentIsNotInUseError extends Error {
  constructor() {
    super(`error in refunding payment `);
    this.name = this.constructor.name
  }
}