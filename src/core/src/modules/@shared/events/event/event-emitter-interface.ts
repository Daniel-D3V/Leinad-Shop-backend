import { BaseEvent } from "./base-event";

export interface EventEmitterInterface {
    emit(event: BaseEvent): Promise<void>;
}