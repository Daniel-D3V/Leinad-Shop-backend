import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SendNotificationUsecaseInterface extends UsecaseInterface {
    execute(input: SendNotificationUsecaseInterface.InputDto): Promise<SendNotificationUsecaseInterface.OutputDto>
}

export namespace SendNotificationUsecaseInterface {

    export type InputDto = {
        content: string
        topic: string
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}