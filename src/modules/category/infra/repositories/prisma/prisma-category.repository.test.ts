import { CategoryEntity } from "@/modules/category/domain/entities"
import { PrismaCategoryRepository } from "./prisma-category.repository"


describe("Test prismaCategoryRepository integration with mysql", () => {

    let sut: PrismaCategoryRepository
    let categoryEntity: CategoryEntity

    beforeAll(() => {
        sut = new PrismaCategoryRepository()
    })

    it("Should ", async () => {
       await sut.create(categoryEntity)
    })
})