import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnouncePriceUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnouncePriceUsecaseInterface.InputDto): Promise<ChangeAnnouncePriceUsecaseInterface.OutputDto>
}

export namespace ChangeAnnouncePriceUsecaseInterface {
    export type InputDto = {
        announceId: string
        price: number
    }

    export type OutputDto = Either<Error[], null>
}