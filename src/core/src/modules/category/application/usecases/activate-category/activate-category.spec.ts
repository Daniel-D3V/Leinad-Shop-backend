

import { mock } from "jest-mock-extended"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { ActivateCategoryUsecase } from "./activate-category.usecase"
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { CategoryActivatedEvent } from "./category-activated.event"
import { ActivateCategoryUsecaseInterface } from "@/modules/category/domain/usecases"

jest.mock("./category-activated.event")

describe("Test ActivateCategoryUsecase", () => {

    let props: ActivateCategoryUsecaseInterface.InputDto
    let sut: ActivateCategoryUsecase
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity


    beforeEach(() => {
        
        props = {
            categoryId: "any_category_id"
        }
        categoryEntity = mock<CategoryEntity>()
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(categoryEntity)

        eventEmitter = mock<EventEmitterInterface>()

        sut = new ActivateCategoryUsecase(categoryRepository, eventEmitter)
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


    it("Should return CategoryAlreadyActivatedError if categoryEntity is already activated", async () => {
        jest.spyOn(categoryEntity, "isActivate")
        .mockReturnValueOnce(true)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")

        expect(output.value[0].name).toBe("CategoryAlreadyActivatedError")
    })

    it("Should call activate from categoryEntity once", async () => {
        await sut.execute(props)
        expect(categoryEntity.activate).toHaveBeenCalledTimes(1)
    })

    it("Should call categoryRepository.update once", async () => {
        await sut.execute(props)
        expect(categoryRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create CategoryActivatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(CategoryActivatedEvent).toHaveBeenCalledWith({ categoryId: props.categoryId })
    })


})