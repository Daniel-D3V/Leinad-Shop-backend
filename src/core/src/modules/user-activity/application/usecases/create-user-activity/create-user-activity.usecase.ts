import { right } from "@/modules/@shared/logic";
import { CreateUserActivityUsecaseInterface } from "../../../domain/usecases";
import { UserActivityRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { UserActivityEntity } from "../../../domain/entities";
import { UserActivityCreatedEvent } from "./user-activity-created.event";


export class CreateUserActivityUsecase implements CreateUserActivityUsecaseInterface {

    constructor(
        private readonly userActivityRepository: UserActivityRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ userId }: CreateUserActivityUsecaseInterface.InputDto): Promise<CreateUserActivityUsecaseInterface.OutputDto> {
        
        const userActivityEntity = UserActivityEntity.create({
            userId
        })
        await this.userActivityRepository.create(userActivityEntity)

        const userActivityCreatedEvent = new UserActivityCreatedEvent({
            ...userActivityEntity.toJSON()
        })
        await this.eventEmitter.emit(userActivityCreatedEvent)

        return right({
            id: userActivityEntity.id
        })
    }
}