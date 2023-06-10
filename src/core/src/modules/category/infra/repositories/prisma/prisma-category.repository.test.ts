import { CategoryEntity } from "@/modules/category/domain/entities"
import { PrismaCategoryRepository } from "./prisma-category.repository"
import { mock } from "jest-mock-extended"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"

describe("Test prismaCategoryRepository integration with mysql", () => {

    let sut: PrismaCategoryRepository
    let categoryEntity: CategoryEntity
    let props: CategoryEntity.PropsJSON
    let id: string

    beforeEach(async () => {
        id = "any_id"
        props = {
            id,
            description: "any description",
            status: "ACTIVE",
            title: "any_title",
        }
        categoryEntity = mock<CategoryEntity>({
            toJSON: () => props
        })
        sut = new PrismaCategoryRepository()
        await prismaClient.category.deleteMany()
    })

    it("Should persist the category on the database", async () => {
        await sut.create(categoryEntity)
        const category = await prismaClient.category.findUnique({
            where: {
                id
            }
        })
        expect({
            ...category,
            parentId: undefined
        }).toEqual(props)
    })

    it("Should find by categoryId", async () => {
        await sut.create(categoryEntity)
        const categoryEntityFound = await sut.findById(id)
        expect(categoryEntityFound).toBeInstanceOf(CategoryEntity)
    })

    it("Should find by title", async () => {
        await sut.create(categoryEntity)
        const categoryEntityFound = await sut.findByTitle("any_title")
        expect(categoryEntityFound).toBeInstanceOf(CategoryEntity)
    })

    it("Should delete a category", async () => {
        await sut.create(categoryEntity)
        await sut.delete(id)
        const categoryEntityFound2 = await sut.findById(id)
        expect(categoryEntityFound2).toBe(null)
    })

    it("Should find by title", async () => {
        await sut.create(categoryEntity)
        const categoryEntityFound = await sut.findByTitle("any_title")
        expect(categoryEntityFound).toBeInstanceOf(CategoryEntity)
    })

    it("Should update the categoryEntity", async () => {
        await sut.create(categoryEntity)
        const updateProps = {
            id,
            description: "new_description",
            status: "DEACTIVE" as CategoryEntity.status,
            title: "new_title",
        }
        categoryEntity = mock<CategoryEntity>({
            id,
            toJSON: () => updateProps
        })
        await sut.update(categoryEntity)

        const categoryEntityFound = await sut.findById(id)
        expect(categoryEntityFound?.toJSON()).toMatchObject(updateProps)
    })
})