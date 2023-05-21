import { RemoveCategoryParentUsecaseInterface } from "@/modules/category/domain/usecases"
import { RemoveCategoryParentUsecase } from "./remove-category-parent.usecase"
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { mock } from "jest-mock-extended"
import { CategoryParentRemovedEvent } from "./category-parent-removed.event"

jest.mock("./category-parent-removed.event")

describe("Test RemoveCategoryParentUseCase", () => {

    let sut: RemoveCategoryParentUsecase
    let props: RemoveCategoryParentUsecaseInterface.InputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {

        props = {
            categoryId: "any_category_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        categoryRepository = mock<CategoryRepositoryInterface>()
        categoryEntity = mock<CategoryEntity>({
            id: "any_category_id"
        })
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(categoryEntity)
        sut = new RemoveCategoryParentUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return a CategoryNotFoundError if the category does not exists", async () => {
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        expect(output.isLeft()).toBe(true)
        expect(output.value![0].name).toBe("CategoryNotFoundError")
    })

    it("Should call removeParentId from the categoryEntity", async () => {
        await sut.execute(props)
        expect(categoryEntity.removeParentId).toBeCalledTimes(1)
    })

    it("Should call update from the categoryRepository", async () => {
        await sut.execute(props)
        expect(categoryRepository.update).toBeCalledTimes(1)
    })

    it("Should call emit from the eventEmitter", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create CategoryParentRemovedEvent with correct values", async () => {
        await sut.execute(props)
        expect(CategoryParentRemovedEvent).toHaveBeenCalledWith({
            categoryId: "any_category_id"
        })
    })
})