import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { Category } from "@prisma/client";

const setStatus = (categoryEntity: CategoryEntity, status: string) => {
    if(status === "ACTIVE") categoryEntity.activate()
    else categoryEntity.deactivate()
}

class PrismaCategoryEntityMapper {
    static toDomain(prismaCategory: Category | null): CategoryEntity | null {
        if(!prismaCategory) return null;
        const categoryEntity = CategoryEntity.create({
            ...prismaCategory
        }, prismaCategory.id)
        if(categoryEntity.isLeft()) throw categoryEntity.value[0]

        setStatus(categoryEntity.value, prismaCategory.status)
        return categoryEntity.value
    }
} 

export class PrismaCategoryRepository implements CategoryRepositoryInterface {
    async findByTitle(title: string): Promise<CategoryEntity | null> {
        const prismaCategory = await prismaClient.category.findFirst({
            where: { title }
        })
        return PrismaCategoryEntityMapper.toDomain(prismaCategory)
    }
    async findById(id: string): Promise<CategoryEntity | null> {
        const prismaCategory = await prismaClient.category.findFirst({
            where: { id }
        })
        return PrismaCategoryEntityMapper.toDomain(prismaCategory)
    }
    async create(category: CategoryEntity): Promise<void> {
        await prismaClient.category.create({ 
            data: {
                ...category.toJSON(),
            }
        })
    }
    async delete(id: string): Promise<void> {
        await prismaClient.category.deleteMany({
            where: { id }
        })
    }
    async update(categoryEntity: CategoryEntity): Promise<void> {
        const { id, ...propsToUpdate } = categoryEntity.toJSON()
        await prismaClient.category.update({
            where: { id },
            data: {
              ...propsToUpdate,
            }
        })
    }

}