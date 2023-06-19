import { UserEntity } from "../entities";

export interface UserRepositoryInterface {
    create(userEntity: UserEntity): Promise<void>
    findById(id: string): Promise<UserEntity | null>
    findByEmail(email: string): Promise<UserEntity | null>
    findByUsername(username: string): Promise<UserEntity | null>
    update(userEntity: UserEntity): Promise<void>
}