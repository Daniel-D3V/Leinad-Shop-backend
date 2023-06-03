import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateAnnounceNormalUsecaseInterface extends UsecaseInterface {
    execute(input: CreateAnnounceNormalUsecaseInterface.InputDto): Promise<CreateAnnounceNormalUsecaseInterface.OutputDto>
}

export namespace CreateAnnounceNormalUsecaseInterface {
    export type InputDto = {
        announceId: string
        price: number
    }

    export type OutputDto = Either<Error[], { id: string }>
}