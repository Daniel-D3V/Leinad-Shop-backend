import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { PersistUpdateCategoryInputDto } from "./persist-update-category.dto"
import { PersistUpdateCategoryUsecase } from "./persist-update-category.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { CategoryUpdatedEvent } from "./category-updated.event"

jest.mock("./category-updated.event")

describe("Test persistUpdateCategoryUsecase", () => {

    let sut: PersistUpdateCategoryUsecase
    let props: PersistUpdateCategoryInputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {
        categoryEntity = mock<CategoryEntity>()
        props = {
            categoryId: "any_category_id",
            data: {}
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(categoryEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new PersistUpdateCategoryUsecase(categoryRepository, eventEmitter)
    }) 

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return CategoryNotFoundError if category could not be found", async () => {
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("CategoryNotFoundError")
    })
    
    it("Should call categoryRepository.update once", async () => {
        await sut.execute(props)
        expect(categoryRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create CategoryUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(CategoryUpdatedEvent).toHaveBeenCalledWith(props)
    })

    it("Should call changeTitle if title is provided", async () => {
        props.data.title = "any_title"
        await sut.execute(props)
        expect(categoryEntity.changeTitle).toHaveBeenCalledTimes(1)
    })

    it("Should call changeDescription if title is provided", async () => {
        props.data.description = "any_description"
        await sut.execute(props)
        expect(categoryEntity.changeDescription).toHaveBeenCalledTimes(1)
    })
})