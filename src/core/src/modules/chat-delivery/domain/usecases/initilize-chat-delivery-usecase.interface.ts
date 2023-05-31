import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface InitializeChatDeliveryUsecaseInterface extends UsecaseInterface {
    execute(data: InitializeChatDeliveryUsecaseInterface.InputDto): Promise<InitializeChatDeliveryUsecaseInterface.OutputDto>;
}

export namespace InitializeChatDeliveryUsecaseInterface {
    export type InputDto = {
        salesmanId: string,
        customerId: string,
        orderId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}