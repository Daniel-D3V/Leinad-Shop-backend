import { PersistActivateCategoryUsecase } from "./persist-activate-category.usecase"
import { PersistActivateCategoryInputDto } from "./persist-activate-category.dto"
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { CategoryActivatedEvent } from "./category-activated.event"

jest.mock("@/modules/category/domain/entities")
jest.mock("./category-activated.event")

describe("Test PersistActivateCategory", () => {

    let sut: PersistActivateCategoryUsecase
    let props: PersistActivateCategoryInputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {
        categoryEntity = mock<CategoryEntity>()

        props = {
            categoryId: "any_category_id"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById")
        .mockResolvedValue(categoryEntity)

        eventEmitter = mock<EventEmitterInterface>()
        sut = new PersistActivateCategoryUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return CategoryNotFoundError if categoryEntity is not found by the repository", async () => {
        jest.spyOn(categoryRepository, "findById")
        .mockResolvedValueOnce(null)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")

        expect(output.value[0].name).toBe("CategoryNotFoundError")
    })

    it("Should call activate on the categoryEntity once", async () => {
        const categoryEntitySpy = jest.spyOn(categoryEntity, "activate")
        await sut.execute(props)
        expect(categoryEntitySpy).toHaveBeenCalledTimes(1)
    })

    it("Should call categoryRepository.update once", async () => {
        const categoryRepositorySpy = jest.spyOn(categoryRepository, "update")
        await sut.execute(props)
        expect(categoryRepositorySpy).toHaveBeenCalledTimes(1)
    })

    it("Should create CategoryActivatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(CategoryActivatedEvent).toHaveBeenCalledWith({
            categoryId: props.categoryId
        })
    })

    it("Should call eventEmitteronce", async () => {
        const eventEmitterSpy = jest.spyOn(eventEmitter, "emit")
        await sut.execute(props)
        expect(eventEmitterSpy).toHaveBeenCalledTimes(1)
    })
})