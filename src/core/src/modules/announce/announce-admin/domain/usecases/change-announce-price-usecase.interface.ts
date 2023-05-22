import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounPriceUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounPriceUsecaseInterface.InputDto): Promise<ChangeAnnounPriceUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounPriceUsecaseInterface {
    export type InputDto = {
        announceId: string
        price: number
    }

    export type OutputDto = Either<Error[], null>
}