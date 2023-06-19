import { UserEntity } from "@/modules/auth/main/domain/entities";
import { UserRepositoryInterface } from "@/modules/auth/main/domain/repositories";
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

    async findById(id: string): Promise<UserEntity | null> {
        const prismaUser = await this.prismaClient.user.findFirst({
            where: { id: id ?? "" }
        })
        if(!prismaUser) return null
        const userEntity = UserEntity.createExistingUser({
            ...prismaUser
        }, prismaUser.id)
        if(userEntity.isLeft()) return null
        return userEntity.value
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const prismaUser = await this.prismaClient.user.findFirst({
            where: { email: email ?? "" }
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
            where: { username: username ?? "" }
        })
        if(!prismaUser) return null
        const userEntity = UserEntity.createExistingUser({
            ...prismaUser
        }, prismaUser.id)
        if(userEntity.isLeft()) return null
        return userEntity.value
    }

    async update(userEntity: UserEntity): Promise<void> {
        const { id, ...props } = userEntity.toJSON()
        await this.prismaClient.user.updateMany({
            where: { id: id ?? "" },
            data: {
                ...props
            }
        })
    }
    
}