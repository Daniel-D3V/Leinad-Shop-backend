export class ConsumptionAlreadyRegisteredError extends Error {
    constructor() {
        super(`Consumption already registered`);
        this.name = this.constructor.name
    }
}