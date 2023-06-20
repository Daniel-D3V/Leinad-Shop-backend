import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface Generate2faUsecaseInterface extends UsecaseInterface {
    execute(data: Generate2faUsecaseInterface.InputDto): Promise<Generate2faUsecaseInterface.OutputDto>;
}

export namespace Generate2faUsecaseInterface {
    export type InputDto = {
        userId: string
    }

    export type OutputDto = Either<Error[], { 
        secret: string
        qrCode: string
    }>
}