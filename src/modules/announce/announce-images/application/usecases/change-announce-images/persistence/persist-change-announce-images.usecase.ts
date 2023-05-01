import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PersistChangeAnnounceImagesInputDto, PersistChangeAnnounceImagesOutputDto } from "./persist-change-announce-images.dto";
import { AnnounceImagesRepositoryInterface } from "@/modules/announce/announce-images/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceImagesChangedEvent } from "./announce-images-changed.event";
import { AnnounceNotFoundError } from "../../_errors";

export class PersistChangeAnnounceImagesUsecase implements UsecaseInterface{

    constructor(
        private readonly announceImagesRepository: AnnounceImagesRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, images }: PersistChangeAnnounceImagesInputDto): Promise<Either<Error[], PersistChangeAnnounceImagesOutputDto>> {

        const announceImageEntity = await this.announceImagesRepository.findById(announceId)
        if(!announceImageEntity) return left([ new AnnounceNotFoundError() ])

        const isImagesValid = announceImageEntity.changeImages(images)
        if(isImagesValid.isLeft()) return left(isImagesValid.value)

        await this.announceImagesRepository.update(announceImageEntity)

        const changeAnnounceImagesCommand = new AnnounceImagesChangedEvent({
            announceId,
            images
        })
        await this.eventEmitter.emit(changeAnnounceImagesCommand)

        return right(null)
    }
}