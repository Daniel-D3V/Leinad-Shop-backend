import { left, right } from "@/modules/@shared/logic";
import {  SetDefaultStatusOptionUsecaseInterface } from "../../../domain/usecases";
import { UserActivityRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { UserActivityNotFoundError } from "../_errors";
import { OptionIsAlreadySetDefaultError } from "./errors";
import { StatusOptionSetDefaultEvent } from "./status-option-set-default.event";


export class SetDefaultStatusOptionUsecase implements SetDefaultStatusOptionUsecaseInterface {

    constructor(
        private readonly userActivityRepository: UserActivityRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ userId }: SetDefaultStatusOptionUsecaseInterface.InputDto): Promise<SetDefaultStatusOptionUsecaseInterface.OutputDto> {
        
        const userActivityEntity = await this.userActivityRepository.findByUserId(userId)
        if(!userActivityEntity) return left([ new UserActivityNotFoundError() ])

        if(userActivityEntity.isOptionDefault()) return left([ new OptionIsAlreadySetDefaultError() ])

        userActivityEntity.setOptionDefault()
        await this.userActivityRepository.update(userActivityEntity)

        const statusOptionSetDefaultEvent = new StatusOptionSetDefaultEvent({
            userActivityId: userActivityEntity.id
        })
        await this.eventEmitter.emit(statusOptionSetDefaultEvent)

        return right(null)
    }
}