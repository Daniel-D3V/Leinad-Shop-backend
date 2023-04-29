import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { CreateAnnounceInputDto, CreateAnnounceOutputDto } from "./create-announce.dto";

export class CreateAnnounceUsecase implements UsecaseInterface{
    async execute(input: CreateAnnounceInputDto): Promise<Either<Error[], CreateAnnounceOutputDto>> {

        

        return right(null)
    }
}