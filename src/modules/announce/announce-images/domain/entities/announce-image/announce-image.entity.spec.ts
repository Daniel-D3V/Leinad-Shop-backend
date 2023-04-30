import { DomainValidator } from "@/modules/@shared/domain/validator"
import { AnnounceImageEntity } from "./announce-image.entity"
import { mockDomainValidator } from "@/modules/@shared/tests"
import { AnnounceImageValidatorFactory } from "./validator"
import { left } from "@/modules/@shared/logic"

jest.mock("./validator")

describe("Test AnnounceImageEntity", () => {

    let sut: AnnounceImageEntity
    let id: string
    let props: AnnounceImageEntity.Input
    let domainValidatorStub: DomainValidator<any>

    const makeSut = (props: AnnounceImageEntity.Input): AnnounceImageEntity => {
        const announceEntityOrError = AnnounceImageEntity.create(props, id)
        if(announceEntityOrError.isLeft()) throw announceEntityOrError.value[0]
        return announceEntityOrError.value
    }

    beforeEach(() => {
        domainValidatorStub = mockDomainValidator()
        jest.spyOn(AnnounceImageValidatorFactory, "create").mockReturnValue(domainValidatorStub)
        id = "any_id"
        props = {
            images: [
                { weight: 1, url: "any_url_1" },
                { weight: 2, url: "any_url_2" },
                { weight: 3, url: "any_url_3" },
                { weight: 4, url: "any_url_4" }
            ]
        }
        sut = makeSut(props)
    })

    it("Should create a AnnounceImageEntity", () => {
        sut = makeSut(props)
        expect(sut.toJSON()).toEqual({
            id,
            images: props.images
        })
    })

    it("Should call domainValidatorStub once", () => {
        expect(domainValidatorStub.validate).toHaveBeenCalledTimes(1)
    })

    it("Should return an error if domainValidatorStub returns an error", () => {
        jest.spyOn(domainValidatorStub, "validate").mockReturnValueOnce(left([ new Error("validatorError") ]))
        const sut = AnnounceImageEntity.create(props, id)
        expect(sut.value).toEqual([ new Error("validatorError") ])
    })

    it("Should get the images length", () => {
        expect(sut.getImagesLength()).toBe(4)
    })

    it("Should get the first image", () => {
        expect(sut.getFirstImage()).toEqual({ weight: 1, url: "any_url_1" })
    })

    it("Should return null if the first image does not exists", () => {
        sut = makeSut({...props, images: []})
        expect(sut.getFirstImage()).toEqual(null)
    })

    it("Should change the images", () => {
        const newImages = [ props.images[3], props.images[4] ]
        sut.changeImages(newImages)
        expect(sut.images).toEqual(newImages)
    })

    it("Should not change the images invalid images is provided ", () => {

        jest.spyOn(domainValidatorStub, "validate")
        .mockReturnValueOnce(left([new Error()]))

        const output = sut.changeImages([])

        expect(output.isLeft()).toBe(true)
        expect(sut.images).toBe(props.images)
    })

    it("Should call domainValidatorStub with correct values when updating the images ", () => {
        const newImages = [ props.images[1] ]
        sut.changeImages(newImages)
        expect(domainValidatorStub.validate).toHaveBeenLastCalledWith({ images: newImages })
    })

    it("Should sort the images when creating ", () => {
        const images = [ 
            { weight: 1, url: "any_url_1" }, 
            { weight: 1, url: "any_url_2" }, 
            { weight: 4, url: "any_url_4" }, 
            { weight: 2, url: "any_url_3" } 
        ]
        sut = makeSut({ ...props, images })
        expect(sut.images).toEqual([
            { weight: 1, url: "any_url_1" }, 
            { weight: 2, url: "any_url_2" }, 
            { weight: 3, url: "any_url_3" }, 
            { weight: 4, url: "any_url_4" } 
        ])
    })

    it("Should call formatImages when creating the entity", () => {
        const announceImageEntitySpy = jest.spyOn(AnnounceImageEntity, "formatImages")
        sut = makeSut(props)
        expect(announceImageEntitySpy).toHaveBeenCalledTimes(1)
        expect(announceImageEntitySpy).toHaveBeenCalledWith(props.images)
    })

    it("Should call formatImages when changing the images", () => {
        const announceImageEntitySpy = jest.spyOn(AnnounceImageEntity, "formatImages")
        sut = makeSut(props)
        sut.changeImages([])
        expect(announceImageEntitySpy).toHaveBeenCalledTimes(2)
    })
})