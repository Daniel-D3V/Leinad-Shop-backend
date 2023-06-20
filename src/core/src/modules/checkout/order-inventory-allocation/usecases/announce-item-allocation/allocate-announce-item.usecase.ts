import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class AllocateAnnounceItemUsecase implements UsecaseInterface {

    async execute(input: any): Promise<Either<Error[], any>> {
        return right(null)
    }
}