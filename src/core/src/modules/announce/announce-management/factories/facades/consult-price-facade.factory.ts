import { ConsultPriceFacadeInterface } from "../../facades";

export class ConsultPriceFacadeFactory {

    static create(): ConsultPriceFacadeInterface {
        return {
            consult: async () => 10
        }
    }
}