import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";

export class PrismaCategoryRepository implements CategoryRepositoryInterface {
    async findByTitle(name: string): Promise<CategoryEntity | null> {
        return null
    }
    findById(id: string): Promise<CategoryEntity | null> {
        throw new Error("Method not implemented.");
    }
    async create(category: CategoryEntity): Promise<void> {
        const output = await prismaClient.category.findFirst({ where: { id: "fs" } })
        console.log(output)
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(categoryEntity: CategoryEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}