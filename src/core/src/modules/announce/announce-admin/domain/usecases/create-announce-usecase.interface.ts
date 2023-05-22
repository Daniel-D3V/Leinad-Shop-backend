import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateAnnounceUsecaseInterface extends UsecaseInterface {
    execute(input: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto>
}

export namespace CreateAnnounceUsecaseInterface {
    export type InputDto = {
        title: string
        description: string
        price: number
        categoryId: string
        userId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}