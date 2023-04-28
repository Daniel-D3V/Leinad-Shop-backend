import { mock } from 'jest-mock-extended';
import { PersistCategoryInputDto } from './persist-category.dto';
import { CategoryEntity } from '@/modules/category/domain/entities';
import { CategoryRepositoryInterface } from '@/modules/category/domain/repositories';
import { EventEmitterInterface } from '@/modules/@shared/events';
import { PersistCategoryUsecase } from './persist-category.usecase';
import { CategoryCreatedEvent } from './category-created.event';

jest.mock("@/modules/category/domain/entities")
jest.mock("./category-created.event")

describe("Test CreateCategoryUsecase", () => {

    let props: PersistCategoryInputDto
    let categoryEntity: jest.Mocked<typeof CategoryEntity>
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let sut: PersistCategoryUsecase

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
        sut = new PersistCategoryUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
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

    it("Should call categoryRepository.create once", async () => {
        const categoryRepositorySpy = jest.spyOn(categoryRepository, "create")
        await sut.execute(props)
        expect(categoryRepositorySpy).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        const eventEmitterSpy = jest.spyOn(eventEmitter, "emit")
        await sut.execute(props)
        expect(eventEmitterSpy).toHaveBeenCalledTimes(1)
    })

    it("Should create CategoryCreatedEvent with correct values", async () => {
        
        await sut.execute(props)
        expect(CategoryCreatedEvent).toHaveBeenCalledWith({ anyEntityToJSONValue: "any" })
        expect(CategoryCreatedEvent).toHaveBeenCalledTimes(1)
    })


})