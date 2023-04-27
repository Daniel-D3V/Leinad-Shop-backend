import { BaseCommand } from "./base-command";


export interface CommandEmitterInterface {
    emit(event: BaseCommand): Promise<void>;
}