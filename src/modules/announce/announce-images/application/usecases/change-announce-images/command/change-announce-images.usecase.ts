import { UsecaseInterface } from "@/modules/@shared/domain";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceImagesInputDto, ChangeAnnounceImagesOutputDto } from "./change-announce-images.dto";
import { AnnounceImagesRepositoryInterface } from "@/modules/announce/announce-images/domain/repositories";
import { AnnounceNotFoundError } from "../../_errors";
import { ChangeAnnounceImagesCommand } from "./change-announce-images.command";


export class ChangeAnnouceImagesUsecase implements UsecaseInterface {
    
    constructor(
        private readonly announceImagesRepository: AnnounceImagesRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ announceId, images }: ChangeAnnounceImagesInputDto): Promise<Either<Error[], ChangeAnnounceImagesOutputDto>> {
        
        const announceImageEntity = await this.announceImagesRepository.findById(announceId)
        if(!announceImageEntity) return left([ new AnnounceNotFoundError() ])

        const isImagesValid = announceImageEntity.changeImages(images)
        if(isImagesValid.isLeft()) return left(isImagesValid.value)

        const changeAnnounceImagesCommand = new ChangeAnnounceImagesCommand({
            announceId,
            images: images
        })

        await this.commandEmitter.emit(changeAnnounceImagesCommand)

        return right(null)
    }
}