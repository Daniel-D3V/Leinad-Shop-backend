
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { UpdateCategoryInfoUsecase } from "./update-category-info.usecase";
import { CategoryInfoUpdatedEvent } from "./category-info-updated.event";
import { UpdateCategoryInfoUsecaseInterface } from "@/modules/category/domain/usecases";


jest.mock("./category-info-updated.event")

describe("Test UpdateCategoryInfoUsecase", () => {

    let sut: UpdateCategoryInfoUsecase
    let props: UpdateCategoryInfoUsecaseInterface.InputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {
        categoryEntity = mock<CategoryEntity>()
        jest.spyOn(categoryEntity, "changeTitle").mockReturnValue({ isLeft: () => false } as any)
        jest.spyOn(categoryEntity, "changeDescription").mockReturnValue({ isLeft: () => false } as any)
        props = {
            categoryId: "any_category_id",
            data: {}
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById")
        .mockResolvedValue(categoryEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateCategoryInfoUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
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
        expect(CategoryInfoUpdatedEvent).toHaveBeenCalledWith(props)
    })


    describe("Title", () => {
        it("Should call changeTitle from categoryEntity if a title is provided", async () => {
            props.data.title = "any_title"
            await sut.execute(props)
            expect(categoryEntity.changeTitle).toHaveBeenCalledTimes(1)
        })

        it("Should return an error if changeTitle returns an error", async () => {
            props.data.title = "any_title"
            jest.spyOn(categoryEntity, "changeTitle").mockReturnValue({ isLeft: () => true, value: [new Error("entityError")] } as any)
            const output = await sut.execute(props)

            expect(output.value![0]).toEqual(new Error("entityError"))
        })

        it("Should return CategoryTitleInUseError if an category with the same title is found", async () => {
            props.data.title = "any_title"
            jest.spyOn(categoryRepository, "findByTitle").mockResolvedValueOnce(true as any)
            const output = await sut.execute(props)
            expect(output.value![0].name).toBe("CategoryTitleInUseError")
        })
    })

    describe("Description", () => {
        it("Should call changeDescription from categoryEntity if a description is provided", async () => {
            props.data.description = "any_description"
            await sut.execute(props)
            expect(categoryEntity.changeDescription).toHaveBeenCalledTimes(1)
        })

        it("Should return an error if changeDescription returns an error", async () => {
            props.data.description = "any_description"
            jest.spyOn(categoryEntity, "changeDescription").mockReturnValue({ isLeft: () => true, value: [new Error("entityError")] } as any)
            const output = await sut.execute(props)

            expect(output.value![0]).toEqual(new Error("entityError"))
        })
    })
})