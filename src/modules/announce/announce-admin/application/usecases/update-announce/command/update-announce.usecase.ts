import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceInputDto, UpdateAnnounceOutputDto } from "./update-announce.dto"
import { UpdateAnnounceCommand } from "./update-announce.command"
import { AnnounceNotFoundError } from "../../_errors"

export class UpdateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ announceId, data }: UpdateAnnounceInputDto): Promise<Either<Error[], UpdateAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        const errors: Error[] = [] 

        if(data.title){
            const isTitleValid = announceEntity.changeTitle(data.title)
            if(isTitleValid.isLeft()) errors.push(...isTitleValid.value)
        }
        if(data.description){
            const isDescriptionValid = announceEntity.changeDescription(data.description)
            if(isDescriptionValid.isLeft()) errors.push(...isDescriptionValid.value)
        }
        if(data.price){
            const isPriceValid = announceEntity.changePrice(data.price)
            if(isPriceValid.isLeft()) errors.push(...isPriceValid.value)
        }

        if(errors.length > 0) return left(errors)

        const apdateAnnounceCommand = new UpdateAnnounceCommand({
            announceId,
            data
        })
        await this.commandEmitter.emit(apdateAnnounceCommand)

        return right(null)
    }
}