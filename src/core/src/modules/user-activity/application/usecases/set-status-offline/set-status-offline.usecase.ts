import { left, right } from "@/modules/@shared/logic";

import { UserActivityNotFoundError } from "../_errors";
import { SetStatusOfflineUsecaseInterface } from "@/modules/user-activity/domain/usecases";
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories";

export class SetStatusOfflineUsecase implements SetStatusOfflineUsecaseInterface {

    constructor(
        private readonly userActivityRepository: UserActivityRepositoryInterface
    ){}

    async execute({ userId }: SetStatusOfflineUsecaseInterface.InputDto): Promise<SetStatusOfflineUsecaseInterface.OutputDto> {
        
        const userActivityEntity = await this.userActivityRepository.findByUserId(userId)
        if(!userActivityEntity) return left([ new UserActivityNotFoundError() ])

        userActivityEntity.setStatusOffline()
        await this.userActivityRepository.update(userActivityEntity)

        return right(null)
    }
}