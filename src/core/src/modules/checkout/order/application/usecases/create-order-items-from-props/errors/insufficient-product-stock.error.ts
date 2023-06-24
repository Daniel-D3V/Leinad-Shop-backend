export class InsufficientProductStockError extends Error {
    constructor() {
      super(`Insufficient stock `);
      this.name = this.constructor.name
    }
  }