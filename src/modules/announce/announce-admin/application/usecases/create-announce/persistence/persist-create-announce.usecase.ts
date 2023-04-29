import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PersistCreateAnnounceInputDto, PersistCreateAnnounceOutputDto } from "./persist-create-announce.dto";
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";
import { AnnounceCreatedEvent } from "./announce-created.event";

export class PersistCreateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: PersistCreateAnnounceInputDto): Promise<Either<Error[], PersistCreateAnnounceOutputDto>> {

        const announceEntity = AnnounceEntity.create({
            ...input
        })
        if(announceEntity.isLeft()) return left(announceEntity.value)

        await this.announceRepository.create(announceEntity.value)

        const announceCreatedEvent = new AnnounceCreatedEvent({
            ...announceEntity.value.toJSON()
        })
        await this.eventEmitter.emit(announceCreatedEvent)

        return right(null)
    }
}