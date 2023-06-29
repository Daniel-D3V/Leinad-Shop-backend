import { Either } from "@/modules/@shared/logic";

export interface UsecaseInterface {
    execute(input: any): Promise<Either<Error[], any>>
}

export namespace UsecaseInterface {
    export type InputDto = any
    export type OutputDto = Either<Error[], any>
}