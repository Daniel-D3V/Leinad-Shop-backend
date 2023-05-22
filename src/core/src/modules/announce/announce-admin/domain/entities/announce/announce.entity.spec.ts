import { AnnounceEntity } from "./announce.entity"
import { DomainValidator } from "@/modules/@shared/domain/validator"
import { mockDomainValidator } from "@/modules/@shared/tests"
import { AnnounceValidatorFactory } from "./validator"
import { mock, MockProxy } from "jest-mock-extended"
import { left } from "@/modules/@shared/logic"

jest.mock("./validator")

describe("Test announce entity", () => {

    let props: AnnounceEntity.Input
    let sut: AnnounceEntity
    let domainValidatorStub: jest.Mocked<DomainValidator<any>>

    const makeSut = (props: AnnounceEntity.Input, id?: string): AnnounceEntity => {
        const sut = AnnounceEntity.create(props, id)
        if(sut.isLeft()) throw sut.value[0]
        return sut.value
    }

    beforeEach(() => {
        domainValidatorStub = mockDomainValidator()
        jest.spyOn(AnnounceValidatorFactory, "create").mockReturnValue(domainValidatorStub)


        props = {
            title: "any_title",
            description: "any_description",
            price: 10,
            categoryId: "any_category_id",
            userId: "any_user_id",
        }
        sut = makeSut(props)
    })

    it("Should Create an announce entity", () => {
        const sut = makeSut(props, "any_id")
        expect(sut.toJSON()).toEqual({
            id: "any_id",
            title: "any_title",
            description: "any_description",
            price: 10,
            categoryId: "any_category_id",
            userId: "any_user_id",
            status: "DEACTIVATED"
        })
    })


    it("Should call domainValidatorStub once", () => {
        expect(domainValidatorStub.validate).toHaveBeenCalledTimes(1)
    })

    it("Should return an error if domainValidatorStub returns an error", () => {
        jest.spyOn(domainValidatorStub, "validate").mockReturnValueOnce(left([ new Error("validatorError") ]))

        const sut = AnnounceEntity.create(props)
        expect(sut.value).toEqual([ new Error("validatorError") ])
    })

    it("Should activate the announce", () => {
        sut.activate()
        expect(sut.status).toBe("ACTIVE")
    })

    it("Should check if the announce is active", () => {
        expect(sut.isActive()).toBe(false)
        sut.activate()
        expect(sut.isActive()).toBe(true)
    })

    it("Should deactivate the announce", () => {
        sut.activate()
        expect(sut.isActive()).toBe(true)
        sut.deactivate()
        expect(sut.status).toBe("DEACTIVATED")
    })

    it("Should check if announce is deactivated", () => {
        expect(sut.isDeactivated()).toBe(true)
        sut.activate()
        expect(sut.isDeactivated()).toBe(false)
    })

    it("Should check if announce is banned", () => {
        expect(sut.isBanned()).toBe(false)
        sut.ban()
        expect(sut.isBanned()).toBe(true)
    })

    it("Should ban the announce", () => {
        sut.ban()
        expect(sut.status).toBe("BANNED")
    })

    describe("change Title", () => {
        it("Should change the title ", () => {
            expect(sut.title).toBe("any_title")
            sut.changeTitle("new_title")
            expect(sut.title).toBe("new_title")
        })
    
        it("Should not update title if an invalid title is provided ", () => {
            expect(sut.title).toBe("any_title")
    
            domainValidatorStub.validate
            .mockReturnValueOnce(left([new Error()]))
    
            const output = sut.changeTitle("invalid_title")
    
            expect(output.isLeft()).toBe(true)
            expect(sut.title).toBe("any_title")
        })
    
        it("Should call domainValidatorStub with correct values when updating the title ", () => {
            const newTitle = "new_title"
            sut.changeTitle(newTitle)
            expect(domainValidatorStub.validate).toHaveBeenLastCalledWith({ ...sut.entityProps, title: newTitle })
        })
    })

    describe("change description", () => {
        it("Should change the description ", () => {
            expect(sut.description).toBe("any_description")
            sut.changeDescription("new_description")
            expect(sut.description).toBe("new_description")
        })
    
        it("Should not update description if an invalid description is provided ", () => {
            expect(sut.description).toBe("any_description")
    
            domainValidatorStub.validate
            .mockReturnValueOnce(left([new Error()]))
    
            const output = sut.changeDescription("invalid_description")
    
            expect(output.isLeft()).toBe(true)
            expect(sut.description).toBe("any_description")
        })
    
        it("Should call domainValidatorStub with correct values when updating the description ", () => {
            const newDescription = "new_description"
            sut.changeDescription(newDescription)
            expect(domainValidatorStub.validate).toHaveBeenLastCalledWith({ ...sut.entityProps, description: newDescription })
        })
    })

    describe("change price", () => {
        it("Should change the price ", () => {
            const newPrice = 20
            expect(sut.price).toBe(10)
            sut.changePrice(newPrice)
            expect(sut.price).toBe(newPrice)
        })
    
        it("Should not update price if an invalid price is provided ", () => {
            expect(sut.price).toBe(10)
    
            domainValidatorStub.validate
            .mockReturnValueOnce(left([new Error()]))
            
            const invalidPrice = 0.01
            const output = sut.changePrice(invalidPrice)
    
            expect(output.isLeft()).toBe(true)
            expect(sut.price).toBe(10)
        })
    
        it("Should call domainValidatorStub with correct values when updating the price ", () => {
            const newPrice = 20
            sut.changePrice(newPrice)
            expect(domainValidatorStub.validate).toHaveBeenLastCalledWith({ ...sut.entityProps, price: newPrice })
        })
    })

})