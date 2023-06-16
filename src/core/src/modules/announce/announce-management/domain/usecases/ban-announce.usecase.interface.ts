import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface BanAnnounceUsecaseInterface extends UsecaseInterface {
    execute(data: BanAnnounceUsecaseInterface.InputDto): Promise<BanAnnounceUsecaseInterface.OutputDto>;
}

export namespace BanAnnounceUsecaseInterface {
    export type InputDto = {
        announceId: string
    }

    export type OutputDto = Either<Error[], null> 
}