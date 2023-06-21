import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface MarkNotificationAsReadUsecaseInterface extends UsecaseInterface {
    execute(input: MarkNotificationAsReadUsecaseInterface.InputDto): Promise<MarkNotificationAsReadUsecaseInterface.OutputDto>
}

export namespace MarkNotificationAsReadUsecaseInterface {

    export type InputDto = {
        notificationId: string
    }

    export type OutputDto = Either<Error[], null>
}