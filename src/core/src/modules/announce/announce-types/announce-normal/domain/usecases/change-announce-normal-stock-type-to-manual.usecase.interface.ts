import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceNormalStockTypeToManualUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceNormalStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToManualUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceNormalStockTypeToManualUsecaseInterface {
    export type InputDto = {
        announceNormalId: string
    }

    export type OutputDto = Either<Error[], null>
}