import {  left, right } from "@/modules/@shared/logic";
import { EventConsumerRepoitoryInterface } from "@/modules/event-sourcing-management/domain/repositories";
import { RegisterEventConsumptionUsecaseInterface } from "@/modules/event-sourcing-management/domain/usecases";
import { ConsumptionAlreadyRegisteredError } from "./errors";


export class RegisterEventConsumptionUsecase implements RegisterEventConsumptionUsecaseInterface{
    constructor(
        private readonly consumerRepository: EventConsumerRepoitoryInterface
    ) {}

    async execute({ consumerName, eventId }: RegisterEventConsumptionUsecaseInterface.InputDto): Promise<RegisterEventConsumptionUsecaseInterface.OutputDto> {
        
        const existingConsumption = await this.consumerRepository.findConsumption(consumerName, eventId)
        if(existingConsumption) return left([ new ConsumptionAlreadyRegisteredError() ])

        await this.consumerRepository.registerConsumption(consumerName, eventId)

        return right(null)
    }
}