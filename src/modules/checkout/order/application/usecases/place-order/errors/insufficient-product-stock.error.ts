export class InsufficientProductStockError extends Error {
    constructor(productId: string, requestedQuantity: number, availableQuantity: number) {
      super(`Insufficient stock for product ${productId}: requested ${requestedQuantity}, available ${availableQuantity}`);
      this.name = this.constructor.name
    }
  }