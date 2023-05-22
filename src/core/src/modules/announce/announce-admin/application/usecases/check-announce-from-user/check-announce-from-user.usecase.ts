import { left, right } from "@/modules/@shared/logic";
import { CheckAnnounceFromUserUsecaseInterface } from "../../../domain/usecases";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { AnnounceNotFoundError } from "../_errors";
import { AnnounceNotFromUserError } from "./errors";

export class CheckAnnounceFromUserUsecase implements CheckAnnounceFromUserUsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface
    ){}

    async execute({ announceId, userId }: CheckAnnounceFromUserUsecaseInterface.InputDto): Promise<CheckAnnounceFromUserUsecaseInterface.OutputDto> {
        
        const announce = await this.announceRepository.findById(announceId)
        if(!announce) return left([ new AnnounceNotFoundError() ])

        const isAnnounceFromUser = announce.userId === userId
        if(!isAnnounceFromUser) return left([ new AnnounceNotFromUserError() ])

        return right(null)
    }
}