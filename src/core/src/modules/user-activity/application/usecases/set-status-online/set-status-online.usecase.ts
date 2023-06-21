import { left, right } from "@/modules/@shared/logic";
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories";
import { SetStatusOnlineUsecaseInterface } from "@/modules/user-activity/domain/usecases";
import { UserActivityNotFoundError } from "../_errors";

export class SetStatusOnlineUsecase implements SetStatusOnlineUsecaseInterface {

    constructor(
        private readonly userActivityRepository: UserActivityRepositoryInterface
    ){}

    async execute({ userId }: SetStatusOnlineUsecaseInterface.InputDto): Promise<SetStatusOnlineUsecaseInterface.OutputDto> {
        
        const userActivityEntity = await this.userActivityRepository.findByUserId(userId)
        if(!userActivityEntity) return left([ new UserActivityNotFoundError() ])

        userActivityEntity.setStatusOnline()
        await this.userActivityRepository.update(userActivityEntity)

        return right(null)
    }
}