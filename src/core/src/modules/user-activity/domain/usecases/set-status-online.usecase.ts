import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetStatusOnlineUsecaseInterface extends UsecaseInterface {
    execute(input: SetStatusOnlineUsecaseInterface.InputDto): Promise<SetStatusOnlineUsecaseInterface.OutputDto>
}

export namespace SetStatusOnlineUsecaseInterface {

    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], null>
}