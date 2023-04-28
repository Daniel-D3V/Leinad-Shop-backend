import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { Category } from "@prisma/client";

const setStatus = (categoryEntity: CategoryEntity, prismaCategory: Category) => {

}

export class PrismaCategoryRepository implements CategoryRepositoryInterface {
    async findByTitle(name: string): Promise<CategoryEntity | null> {
        return null
    }
    async findById(id: string): Promise<CategoryEntity | null> {
        const prismaCategory = await prismaClient.category.findFirst({
            where: { id }
        })
        if(!prismaCategory) return null
        const categoryEntity = CategoryEntity.create({
            ...prismaCategory
        }, prismaCategory.id)
        if(categoryEntity.isLeft()) throw categoryEntity.value[0]

        setStatus(categoryEntity.value, prismaCategory)

        return categoryEntity.value
    }
    async create(category: CategoryEntity): Promise<void> {
        await prismaClient.category.create({ 
            data: {
                ...category.toJSON(),
            }
        })
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(categoryEntity: CategoryEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}