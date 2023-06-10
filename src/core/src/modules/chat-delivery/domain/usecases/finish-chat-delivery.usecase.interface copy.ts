import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface FinishChatDeliveryUsecaseInterface extends UsecaseInterface {
    execute(data: FinishChatDeliveryUsecaseInterface.InputDto): Promise<FinishChatDeliveryUsecaseInterface.OutputDto>;
}

export namespace FinishChatDeliveryUsecaseInterface {
    export type InputDto = {
        chatDeliveryId: string
    }

    export type OutputDto = Either<Error[], null>
}