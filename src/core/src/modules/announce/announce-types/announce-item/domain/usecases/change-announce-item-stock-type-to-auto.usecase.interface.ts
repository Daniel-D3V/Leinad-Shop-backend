import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceItemStockTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceItemStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceItemStockTypeToAutoUsecaseInterface {
    export type InputDto = {
        announceItemId: string
    }

    export type OutputDto = Either<Error[], null>
}