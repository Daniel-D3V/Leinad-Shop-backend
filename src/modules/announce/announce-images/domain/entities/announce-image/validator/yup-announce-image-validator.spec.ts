import { YupAnnounceImageValidator } from "./yup-announce-image-validator"


describe("Test YupAnnounceImageValidator", () => {

    let sut: YupAnnounceImageValidator
    let props: YupAnnounceImageValidator.ValidateFields

    beforeEach(() => {
        sut = new YupAnnounceImageValidator()
        props = {
            images: [
                { weight: 1, url: "any_url_1" },
                { weight: 2, url: "any_url_2" },
                { weight: 3, url: "any_url_3" },
                { weight: 4, url: "any_url_4" }
            ]
        }
    })

    describe("Test images", () => {

        it("Should return ImagesNotProvidedError if images field are not provided", () => {
            props.images = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("ImagesNotProvidedError")
        })

        it("Should return InvalidImagesLengthError if the size of images provided is greater than allowed", () => {
            props.images.push(...props.images, ...props.images)
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidImagesLengthError")
        })
        
    })

    describe("Test imageWeight", () => {

        it("Should return InvalidWeightTypeError if type of weight provided is invalid", () => {
            props.images[2].weight = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidWeightTypeError")
        })

        it("Should return WeightNotProvidedError if weight is not provided", () => {
            props.images[2].weight = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("WeightNotProvidedError")
        })
        

        it("Should return InvalidWeightSizeError if weight size is invalid", () => {
            const invalidMinWeight = -1
            props.images[2].weight = invalidMinWeight
            const outputMin = sut.validate(props)
            expect(outputMin.value![0].name).toBe("InvalidWeightSizeError")

            const invalidMaxWeight = 1000001
            props.images[2].weight = invalidMaxWeight
            const outputMax = sut.validate(props)
            expect(outputMax.value![0].name).toBe("InvalidWeightSizeError")
        })
    })

    describe("Test imageUrl", () => {

        it("Should return InvalidUrlTypeError if type of url provided is invalid", () => {
            props.images[2].url = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidUrlTypeError")
        })

        it("Should return UrlNotProvidedError if weight is not provided", () => {
            props.images[2].url = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("UrlNotProvidedError")
        })
        

        it("Should return InvalidUrlLengthError if weight size is invalid", () => {

            const invalidUrl = "A".repeat(256)
            props.images[2].url = invalidUrl
            const outputMax = sut.validate(props)
            expect(outputMax.value![0].name).toBe("InvalidUrlLengthError")
        })
    })
})