import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { PersistDeleteCategoryUsecase } from "./persist-delete-category.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { PersistDeleteCategoryInputDto } from "./persist-delete-category.dto"
import { mock } from "jest-mock-extended"
import { CategoryDeletedEvent } from "./category-deleted.event";

jest.mock("./category-deleted.event")

describe("Test PersistDeleteCategoryUsecase", () => {

    let sut: PersistDeleteCategoryUsecase
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let props: PersistDeleteCategoryInputDto

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new PersistDeleteCategoryUsecase(categoryRepository, eventEmitter)
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