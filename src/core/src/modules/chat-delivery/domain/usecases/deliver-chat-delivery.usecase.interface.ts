import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeliverChatDeliveryUsecaseInterface extends UsecaseInterface {
    execute(data: DeliverChatDeliveryUsecaseInterface.InputDto): Promise<DeliverChatDeliveryUsecaseInterface.OutputDto>;
}

export namespace DeliverChatDeliveryUsecaseInterface {
    export type InputDto = {
        chatDeliveryId: string
    }

    export type OutputDto = Either<Error[], null>
}