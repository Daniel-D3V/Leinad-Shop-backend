import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { EventConsumerModel, EventModel } from "../models";

export interface RegisterEventConsumptionUsecaseInterface extends UsecaseInterface{
    execute(input: RegisterEventConsumptionUsecaseInterface.InputDto): Promise<RegisterEventConsumptionUsecaseInterface.OutputDto>
}

export namespace RegisterEventConsumptionUsecaseInterface {
    export type InputDto = EventConsumerModel
    export type OutputDto = Either<Error[], null>
}