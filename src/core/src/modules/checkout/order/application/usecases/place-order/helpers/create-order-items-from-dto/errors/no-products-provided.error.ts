export class NoProductsProvidedError extends Error {
    constructor() {
      super(`At least one product must be provided`);
      this.name = this.constructor.name
    }
  }