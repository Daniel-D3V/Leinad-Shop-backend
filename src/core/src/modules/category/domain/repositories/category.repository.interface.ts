import { CategoryEntity } from "../entities";

export interface CategoryRepositoryInterface {
    findByTitle(title: string): Promise<CategoryEntity | null>
    findById(id: string): Promise<CategoryEntity | null>
    create(category: CategoryEntity): Promise<void>
    delete(id: string): Promise<void>
    update(categoryEntity: CategoryEntity): Promise<void>
}