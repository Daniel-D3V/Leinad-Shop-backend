import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceNormalPriceUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceNormalPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalPriceUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceNormalPriceUsecaseInterface {
    export type InputDto = {
        announceNormalId: string
        price: number
    }

    export type OutputDto = Either<Error[], null>
}