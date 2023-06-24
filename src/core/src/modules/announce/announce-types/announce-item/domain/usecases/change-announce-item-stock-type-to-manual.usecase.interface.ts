import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceItemStockTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceItemStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceItemStockTypeToManualUsecaseInterface {
    export type InputDto = {
        announceItemId: string
    }

    export type OutputDto = Either<Error[], null>
}