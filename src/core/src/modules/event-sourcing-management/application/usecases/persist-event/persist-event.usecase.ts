import { Either, right } from "@/modules/@shared/logic";
import { EventModel } from "@/modules/event-sourcing-management/domain/models";
import { EventRepositoryInterface } from "@/modules/event-sourcing-management/domain/repositories";
import { PersistEventUsecaseInterface } from "@/modules/event-sourcing-management/domain/usecases";


export class PersistEventUsecase implements PersistEventUsecaseInterface{
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> {
        
        await this.eventRepository.persitEvent(input)

        return right(null)
    }
}