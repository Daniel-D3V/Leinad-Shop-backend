import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { CategoryDeletedEvent } from "./category-deleted.event";
import { DeleteCategoryUsecase } from "./delete-category.usecase";
import { DeleteCategoryUsecaseInterface } from "@/modules/category/domain/usecases";

jest.mock("./category-deleted.event")

describe("Test PersistDeleteCategoryUsecase", () => {

    let sut: DeleteCategoryUsecase
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let props: DeleteCategoryUsecaseInterface.InputDto

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(true as any)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteCategoryUsecase(categoryRepository, eventEmitter)
    })

    it("Should return CategoryNotFoundError if categoryEntity is not found by the repository", async () => {
        jest.spyOn(categoryRepository, "findById")
        .mockResolvedValueOnce(null)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")

        expect(output.value[0].name).toBe("CategoryNotFoundError")
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should call eventEmitter once", async () => {
         await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create CategoryDeletedEvent with correct values", async () => {
        await sut.execute(props)
       expect(CategoryDeletedEvent).toHaveBeenCalledWith({ categoryId: props.categoryId })
   })
})