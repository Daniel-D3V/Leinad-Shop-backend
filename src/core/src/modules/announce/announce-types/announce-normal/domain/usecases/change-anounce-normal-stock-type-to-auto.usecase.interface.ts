import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceNormalStockTypeToAutoUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceNormalStockTypeToAutoUsecaseInterface {
    export type InputDto = {
        announceNormalId: string
    }

    export type OutputDto = Either<Error[], null>
}