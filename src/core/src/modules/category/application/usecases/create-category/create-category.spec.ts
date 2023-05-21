import { CategoryEntity } from "@/modules/category/domain/entities";
import { CreateCategoryUsecase } from "./create-category.usecase";
import { mock } from 'jest-mock-extended';
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryCreatedEvent } from "./category-created.event";
import { CreateCategoryUsecaseInterface } from "@/modules/category/domain/usecases";

jest.mock("@/modules/category/domain/entities")
jest.mock("./category-created.event")

describe("Test CreateCategoryUsecase", () => {

    let props: CreateCategoryUsecaseInterface.InputDto
    let categoryEntity: jest.Mocked<typeof CategoryEntity>
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: CreateCategoryUsecase

    beforeEach(() => {
        categoryEntity = CategoryEntity as jest.Mocked<typeof CategoryEntity>
        categoryEntity.create.mockReturnValue({
            isLeft: () => false,
            value: {
                toJSON: () => ({ anyEntityToJSONValue: "any" }),
            }
        } as any)

        props = {
            description: "any_description",
            title: "any_title"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new CreateCategoryUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute CreateCategoryUsecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return left if the categoryEntity is invalid", async () => {
        categoryEntity.create.mockReturnValueOnce({
            isLeft: () => true,
            value: [ new Error("EntityError") ]
        } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("usecase should not return right")

        expect(output.isLeft()).toBe(true)
        expect(output.value[0]).toEqual(new Error("EntityError"))
    })

    it("Should return CategoryTitleInUseError if categoryRepository finds a category using a title", async () => {
        const categoryRepositorySpy = jest.spyOn(categoryRepository, "findByTitle")
        .mockReturnValueOnce(true as any)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("usecase should not return right")

        expect(output.value[0].name).toBe("CategoryTitleInUseError")
        expect(categoryRepositorySpy).toHaveBeenCalledTimes(1)
    })

    it("Should call categoryRepository.create once", async () => {
        const categoryRepositorySpy = jest.spyOn(categoryRepository, "create")
        await sut.execute(props)
        expect(categoryRepositorySpy).toHaveBeenCalledTimes(1)
    })


    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create CategoryCreatedEvent with correct values", async () => {
        
        await sut.execute(props)
        expect(CategoryCreatedEvent).toHaveBeenCalledWith({ anyEntityToJSONValue: "any" })
    })
})
