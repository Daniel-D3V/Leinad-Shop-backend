import { left, right } from "@/modules/@shared/logic";
import { CreateAnnounceNormalUsecaseInterface } from "../../../domain/usecases";
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceNormalEntity } from "../../../domain/entities";
import { AnnounceNormalCreatedEvent } from "./announce-normal-created.event";
import { AnnounceNormalAlreadyCreatedError } from "./errors";

export class CreateAnnounceNormalUsecase implements CreateAnnounceNormalUsecaseInterface {

    constructor(
        private readonly announceNormalRepository: AnnounceNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: CreateAnnounceNormalUsecaseInterface.InputDto): Promise<CreateAnnounceNormalUsecaseInterface.OutputDto> {
        
        const announceNormalEntity = AnnounceNormalEntity.create({
            ...input
        })
        if(announceNormalEntity.isLeft()) return left(announceNormalEntity.value)

        const announceNormalExists = await this.announceNormalRepository.findByAnnounceId(input.announceId)
        if(announceNormalExists) return left([ new AnnounceNormalAlreadyCreatedError() ])

        await this.announceNormalRepository.create(announceNormalEntity.value)

        const announceNormalCreatedEvent = new AnnounceNormalCreatedEvent({
            ...announceNormalEntity.value.toJSON()
        })
        await this.eventEmitter.emit(announceNormalCreatedEvent)

        return right({
            id: announceNormalEntity.value.id,
        })
    }
}