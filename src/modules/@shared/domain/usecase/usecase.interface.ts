import { Either } from "@/modules/@shared/logic";

export interface UsecaseInterface {
    execute(input: any): Promise<Either<Error[], any>>
}

