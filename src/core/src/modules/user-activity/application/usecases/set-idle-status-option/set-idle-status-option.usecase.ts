import { left, right } from "@/modules/@shared/logic";
import { SetIdleStatusOptionUsecaseInterface } from "../../../domain/usecases";
import { UserActivityRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { UserActivityNotFoundError } from "../_errors";
import { StatusOptionSetIdleEvent } from "./status-option-set-idle.event";
import { OptionIsAlreadySetIdleError } from "./errors";


export class SetIdleStatusOptionUsecase implements SetIdleStatusOptionUsecaseInterface {

    constructor(
        private readonly userActivityRepository: UserActivityRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ userId }: SetIdleStatusOptionUsecaseInterface.InputDto): Promise<SetIdleStatusOptionUsecaseInterface.OutputDto> {
        
        const userActivityEntity = await this.userActivityRepository.findByUserId(userId)
        if(!userActivityEntity) return left([ new UserActivityNotFoundError() ])

        if(userActivityEntity.isOptionIdle()) return left([ new OptionIsAlreadySetIdleError() ])

        userActivityEntity.setOptionIdle()
        await this.userActivityRepository.update(userActivityEntity)

        const statusOptionSetIdleEvent = new StatusOptionSetIdleEvent({
            userActivityId: userActivityEntity.id
        })
        await this.eventEmitter.emit(statusOptionSetIdleEvent)

        return right(null)
    }
}