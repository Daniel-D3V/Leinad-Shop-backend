import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { EventModel } from "../models";

export interface PersistEventUsecaseInterface extends UsecaseInterface{
    execute(input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto>
}

export namespace PersistEventUsecaseInterface {
    export type InputDto = EventModel
    export type OutputDto = Either<Error[], null>
}