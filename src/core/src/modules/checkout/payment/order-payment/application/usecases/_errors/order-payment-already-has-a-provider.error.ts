export class OrderPaymentAlreadyHasAProviderError extends Error {
    constructor(){
        super(`Order payment has already a provider.`)
        this.name = this.constructor.name
    }
}