import { CheckAnnounceExistsFacadeInterface } from "../../facades";

export class CheckAnnounceExistsFacadeFactory {
    static create(): CheckAnnounceExistsFacadeInterface {
        return {
            execute: async (announceId: string) => true
        }
    }
}