import { SetCategoryParentUsecaseInterface } from "@/modules/category/domain/usecases"
import { SetCategoryParentUsecase } from "./set-category-parent.usecase"
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { mock } from "jest-mock-extended"
import { CategoryParentSetEvent } from "./category-parent-set.event"

jest.mock("./category-parent-set.event")

describe("Test SetCategoryParentUsecase", () => {

    let sut: SetCategoryParentUsecase
    let props: SetCategoryParentUsecaseInterface.InputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity
    let parrentCategoryEntity: CategoryEntity

    beforeEach(() => {

        props = {
            categoryId: "any_category_id",
            parentId: "any_parrent_id"
        }
        eventEmitter = mock<EventEmitterInterface>();
        categoryRepository = mock<CategoryRepositoryInterface>()
        categoryEntity = mock<CategoryEntity>({ id: props.categoryId })
        parrentCategoryEntity = mock<CategoryEntity>({ id: props.parentId })
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(categoryEntity)
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(parrentCategoryEntity)
        sut = new SetCategoryParentUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase Properly", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBe(true)
    })

    it("Should return a CategoryNotFoundError if the category does not exists", async () => {
        jest.spyOn(categoryRepository, "findById").mockRestore()
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(null)
        const result = await sut.execute(props)
        if(result.isRight()) throw new Error("Should not return a right value")
        expect(result.isLeft()).toBe(true)
        expect(result.value[0].name).toBe("CategoryNotFoundError")
    })

    it("Should return a ParentCategoryNotFoundError if the parrent category does not exists", async () => {
        jest.spyOn(categoryRepository, "findById").mockRestore()
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(categoryEntity)
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(null)
        const result = await sut.execute(props)
        if(result.isRight()) throw new Error("Should not return a right value")
        expect(result.isLeft()).toBe(true)
        expect(result.value[0].name).toBe("ParentCategoryNotFoundError")
    })

    it("Should return a SubCategoryProvidedError if the parrent category is a sub category", async () => {
        jest.spyOn(categoryRepository, "findById").mockRestore()
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(categoryEntity)
        jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(parrentCategoryEntity)
        jest.spyOn(parrentCategoryEntity, "isSubCategory").mockReturnValueOnce(true)
        const result = await sut.execute(props)
        if(result.isRight()) throw new Error("Should not return a right value")
        expect(result.isLeft()).toBe(true)
        expect(result.value[0].name).toBe("SubCategoryProvidedError")
    })

    it("Should emit a CategoryParentSetEvent", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create CategoryParentSetEvent with correct value", async () => {
        await sut.execute(props)
        expect(CategoryParentSetEvent).toHaveBeenCalledWith(props)
    })

    
})