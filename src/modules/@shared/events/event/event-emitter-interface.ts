import { BaseEvent } from "./base-event";

export interface eventEmitterInterface {
    emit(event: BaseEvent): Promise<void>;
}