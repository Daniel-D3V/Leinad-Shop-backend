import { GetAnnouncePriceFacadeInterface } from "../../facades";

export class GetAnnouncePriceFacadeFactory {
    static create(): GetAnnouncePriceFacadeInterface {
        return {
            execute: async (announceId: string) => 100
        }
    }
}