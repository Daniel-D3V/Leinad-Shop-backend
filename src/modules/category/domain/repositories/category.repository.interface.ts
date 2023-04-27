import { CategoryEntity } from "../entities";

export interface CategoryRepositoryInterface {
    findByTitle(name: string): Promise<CategoryEntity | null>
}