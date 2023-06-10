import { ConsultStockFacadeInterface } from "../../facades";

export class ConsultStockFacadeFactory {
    static create(): ConsultStockFacadeInterface {
        return {
            consult: async () => 0
        }
    }
}