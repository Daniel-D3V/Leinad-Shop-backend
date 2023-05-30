import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceItemPriceUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceItemPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceItemPriceUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceItemPriceUsecaseInterface {
    export type InputDto = {
        announceItemId: string
        price: number
    }

    export type OutputDto = Either<Error[], null>
}