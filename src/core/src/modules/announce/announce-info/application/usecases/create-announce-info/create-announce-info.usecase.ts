import { left, right } from "@/modules/@shared/logic";
import { CreateAnnounceInfoUsecaseInterface } from "../../../domain/usecases";
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories";
import { AnnounceInfoEntity } from "../../../domain/entities";
import { AnnounceInfoAlreadyCreatedError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceInfoCreatedEvent } from "./announce-info-created.event";

export class CreateAnnounceInfoUsecase implements CreateAnnounceInfoUsecaseInterface {

    constructor(
        private readonly announceInfoRepository: AnnounceInfoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: CreateAnnounceInfoUsecaseInterface.InputDto): Promise<CreateAnnounceInfoUsecaseInterface.OutputDto> {
        
        const announceInfoEntity = AnnounceInfoEntity.create({
            ...input
        })
        if(announceInfoEntity.isLeft()) return left(announceInfoEntity.value)

        const announceInfoExists = await this.announceInfoRepository.findByAnnounceId(input.announceId)
        if(announceInfoExists) return left([ new AnnounceInfoAlreadyCreatedError() ])

        await this.announceInfoRepository.create(announceInfoEntity.value)

        const announceInfoCreatedEvent = new AnnounceInfoCreatedEvent({
            ...announceInfoEntity.value.toJSON()
        })
        await this.eventEmitter.emit(announceInfoCreatedEvent)

        return right({
            id: announceInfoEntity.value.id
        })
    }
}