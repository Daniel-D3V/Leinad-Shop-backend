import { DomainValidatorStub } from "@/modules/@shared/tests"
import { CategoryEntity } from "./category.entity"
import { CategoryValidatorFactory } from "./validator"

jest.mock("./validator")

describe("test CategoryEntity", () => {

    let sut: CategoryEntity
    let props: CategoryEntity.Input
    let categoryValidatorFactory: jest.Mocked<typeof CategoryValidatorFactory>

    const makeSut = (props: CategoryEntity.Input) => {
        
        const categoryEntityOrError = CategoryEntity.create(props)
        if(categoryEntityOrError.isLeft()) throw categoryEntityOrError.value[0]
        sut = categoryEntityOrError.value
        return sut
    }
    
    beforeEach(() => {
        categoryValidatorFactory = CategoryValidatorFactory as jest.Mocked<typeof CategoryValidatorFactory>
        categoryValidatorFactory.create.mockReturnValue(new DomainValidatorStub())
        
        props = {
            title: "any_title",
            description: "any_description",
        }
        sut = makeSut(props)
    })

    it("Should create a CategoryEntity", () => {
        const sut = CategoryEntity.create(props, "any_id")
        if(sut.isLeft()) throw sut.value[0]

        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            title: props.title,
            description: props.description,
            parrentId: props.parrentId,
            status: "DEACTIVE"
        })
    })

    it("Should be a subCategory if parrentId is provided", () => {
        const sut  = makeSut({
            ...props,
            parrentId: "any_parrent_id",
        })
        expect(sut.isSubCategory()).toBe(true)
    })

    it("Should not be a subCategory if parrentId is not provided", () => {
        const sut  = makeSut({
            ...props
        })
        expect(sut.isSubCategory()).toBe(false)
    })

    it("Should activate a category", () => {
        expect(sut.isActivate()).toBe(false)
        sut.activate()
        expect(sut.isActivate()).toBe(true)
    })

    it("Should deactivate a category", () => {
        sut.activate()
        expect(sut.isActivate()).toBe(true)
        sut.deactivate()
        expect(sut.isActivate()).toBe(false)
    })

    it("Should check if the category is active", () => {
        expect(sut.status).toBe("DEACTIVE")
        expect(sut.isActivate()).toBe(false)
        
        sut.activate()
        expect(sut.status).toBe("ACTIVE")
        expect(sut.isActivate()).toBe(true)
    })




})