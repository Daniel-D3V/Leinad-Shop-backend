import { UserEntity } from "@/modules/auth/domain/entities";
import { UserRepositoryInterface } from "@/modules/auth/domain/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements UserRepositoryInterface {

    constructor(
        private readonly prismaClient: PrismaClient
    ){}

    async create(userEntity: UserEntity): Promise<void> {
        await this.prismaClient.user.create({
            data: {
                ...userEntity.toJSON()
            }
        })
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        const prismaUser = await this.prismaClient.user.findFirst({
            where: { email }
        })
        if(!prismaUser) return null
        const userEntity = UserEntity.createExistingUser({
            ...prismaUser
        }, prismaUser.id)
        if(userEntity.isLeft()) return null
        return userEntity.value
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const prismaUser = await this.prismaClient.user.findFirst({
            where: { username }
        })
        if(!prismaUser) return null
        const userEntity = UserEntity.createExistingUser({
            ...prismaUser
        }, prismaUser.id)
        if(userEntity.isLeft()) return null
        return userEntity.value
    }
    
}