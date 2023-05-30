import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateAnnounceItemUsecaseInterface extends UsecaseInterface {
    execute(input: CreateAnnounceItemUsecaseInterface.InputDto): Promise<CreateAnnounceItemUsecaseInterface.OutputDto>
}

export namespace CreateAnnounceItemUsecaseInterface {
    export type InputDto = {
        announceId: string
        price: number
        title: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}