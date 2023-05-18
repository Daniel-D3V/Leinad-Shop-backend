import { UserEntity } from "../entities";

export interface UserRepositoryInterface {
    create(userEntity: UserEntity): Promise<void>
    findByEmail(email: string): Promise<UserEntity | null>
}