import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";

export class PrismaCategoryRepository implements CategoryRepositoryInterface {
    findByTitle(name: string): Promise<CategoryEntity | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<CategoryEntity | null> {
        throw new Error("Method not implemented.");
    }
    create(category: CategoryEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(categoryEntity: CategoryEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}