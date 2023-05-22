import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ChangeAnnounceImagesUsecaseInterface extends UsecaseInterface {
    execute(input: ChangeAnnounceImagesUsecaseInterface.InputDto): Promise<ChangeAnnounceImagesUsecaseInterface.OutputDto>
}

export namespace ChangeAnnounceImagesUsecaseInterface {
    export type InputDto = {
        announceId: string,
        images: {
            weight: number
            url: string
        }[]
    }

    export type OutputDto = Either<Error[], null>
}