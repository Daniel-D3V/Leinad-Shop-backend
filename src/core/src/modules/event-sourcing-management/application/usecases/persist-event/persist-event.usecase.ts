import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { EventRepositoryInterface } from "../../domain/repositories";
import { EventModel } from "../../domain/models";

export class PersistEventUsecase implements UsecaseInterface{
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(input: EventModel): Promise<Either<Error[], any>> {
        
        await this.eventRepository.persitEvent(input)

        return right(null)
    }
}