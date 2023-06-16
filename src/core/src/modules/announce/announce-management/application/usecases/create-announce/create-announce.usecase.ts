import { left, right } from "@/modules/@shared/logic";
import { AnnounceManagementEntity } from "../../../domain/entities";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { CreateAnnounceUsecaseInterface } from "../../../domain/usecases";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceCreatedEvent } from "./announce-created.event";

export class CreateAnnounceUsecase implements CreateAnnounceUsecaseInterface {
    
    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface 
    ){}
    
    async execute({ userId, categoryId }: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto> {
        
        const announceEntity = AnnounceManagementEntity.create({
            userId,
            categoryId
        });
        if(announceEntity.isLeft()) return left(announceEntity.value)

        await this.announceManagementRepository.create(announceEntity.value);
        
        const announceCreatedEvent = new AnnounceCreatedEvent({
            ...announceEntity.value.toJSON()
        })

        await this.eventEmitter.emit(announceCreatedEvent)

        return right({
            id: announceEntity.value.id
        })

    }

}