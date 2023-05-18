import { GetProductStockFacadeInterface } from "../../facades";

export class GetProductStockFacadeFactory {
    static create(): GetProductStockFacadeInterface {
        return {
            execute: async (productId: string) => 0
        }
    }
}