import { UserActivityEntity } from "../entities";

export interface UserActivityRepositoryInterface {

    create(userActivityEntity: UserActivityEntity): Promise<void>
    findByUserId(userId: string): Promise<UserActivityEntity | null>
    update(usserActivityEntity: UserActivityEntity): Promise<void>
}