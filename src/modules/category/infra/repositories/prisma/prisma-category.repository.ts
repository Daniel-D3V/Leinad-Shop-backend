import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { Category, PrismaClient, Prisma } from "@prisma/client";

const setStatus = (categoryEntity: CategoryEntity, status: string) => {
    if(status === "ACTIVE") categoryEntity.activate()
    else categoryEntity.deactivate()
}
Prisma.Prisma__CategoryClient
class PrismaCategoryEntityMapper {
    static toDomain(prismaCategory: Category | null): CategoryEntity | null {
        if(!prismaCategory) return null;
        const categoryEntity = CategoryEntity.create({
            ...prismaCategory,
            description: prismaCategory.description!
        }, prismaCategory.id)
        if(categoryEntity.isLeft()) throw categoryEntity.value[0]

        setStatus(categoryEntity.value, prismaCategory.status)
        return categoryEntity.value
    }
} 

export class PrismaCategoryRepository implements CategoryRepositoryInterface {

    prismaClient: PrismaClient

    constructor(provideprismaClient?: PrismaClient){
        this.prismaClient = provideprismaClient ?? prismaClient
    }

    async findByTitle(title: string): Promise<CategoryEntity | null> {
        const prismaCategory = await this.prismaClient.category.findFirst({
            where: { title }
        })
        return PrismaCategoryEntityMapper.toDomain(prismaCategory)
    }
    async findById(id: string): Promise<CategoryEntity | null> {
        const prismaCategory = await this.prismaClient.category.findFirst({
            where: { id }
        })
        return PrismaCategoryEntityMapper.toDomain(prismaCategory)
    }
    async create(category: CategoryEntity): Promise<void> {
        await this.prismaClient.category.create({ 
            data: {
                ...category.toJSON(),
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prismaClient.category.deleteMany({
            where: { id }
        })
    }
    async update(categoryEntity: CategoryEntity): Promise<void> {
        const { id, ...propsToUpdate } = categoryEntity.toJSON()
        await this.prismaClient.category.update({
            where: { id },
            data: {
              ...propsToUpdate,
            }
        })
    }

}