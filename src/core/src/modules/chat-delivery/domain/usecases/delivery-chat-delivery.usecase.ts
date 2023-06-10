import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface DeliveryChatDeliveryUsecaseInterface extends UsecaseInterface {
    execute(data: DeliveryChatDeliveryUsecaseInterface.InputDto): Promise<DeliveryChatDeliveryUsecaseInterface.OutputDto>;
}

export namespace DeliveryChatDeliveryUsecaseInterface {
    export type InputDto = {
        chatDeliveryId: string
    }

    export type OutputDto = Either<Error[], null>
}