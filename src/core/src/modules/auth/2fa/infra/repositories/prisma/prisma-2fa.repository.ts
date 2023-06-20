import { PrismaClient } from "@prisma/client";
import { TwoFactorAuthenticationEntity } from "../../../domain/entities";
import { TwoFactorAuthenticationRepositoryInterface } from "../../../domain/repositories";


export class PrismaTwoFactorAuthenticationRepository implements TwoFactorAuthenticationRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async create(twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity): Promise<void> {
        await this.prismaClient.twofactor.create({
            data: {
                ...twoFactorAuthenticationEntity.toJSON()
            }
        })
    }
    async findByUserId(userId: string): Promise<TwoFactorAuthenticationEntity | null> {
        const twoFactor = await this.prismaClient.twofactor.findFirst({
            where: { userId: userId ?? "" }
        })
        if(!twoFactor) return null
        return TwoFactorAuthenticationEntity.create(twoFactor, twoFactor.id)
    }
    async update(twoFactorAuthenticationEntity: TwoFactorAuthenticationEntity): Promise<void> {
        const { id, userId, ...props } = twoFactorAuthenticationEntity.toJSON()
        await this.prismaClient.twofactor.updateMany({
            where: { id: id ?? ""},
            data: {
                ...props
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.twofactor.deleteMany({
            where: { id: id ?? "" }
        })
    }

} 