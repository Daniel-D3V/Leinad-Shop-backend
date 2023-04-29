import { YupAnnounceValidator } from "./yup-announce-validator"


describe("Test yupAnnounceValidator", () => {

    let props: YupAnnounceValidator.ValidateFields
    let sut: YupAnnounceValidator

    beforeEach(() => {
        props = {
            title: "any_title",
            description: "any_description",
            price: 10
        }
        sut = new YupAnnounceValidator()
    })

    describe("Test title field", () => {
        
        it("Should  return InvalidTitleTypeError if an invalid title type is provided", () => {
            props.title = { } as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidTitleTypeError")
        })

        it("Should  return TitleNotProvidedError if title is not provided", () => {
            props.title = undefined as unknown as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("TitleNotProvidedError")
        })

        it("Should  return InvalidTitleLengthError if an invalid title length is provided", () => {
            props.title = "A".repeat(4)
            const outputMinLength = sut.validate(props)
            expect(outputMinLength.value![0].name).toBe("InvalidTitleLengthError")

            props.title = "A".repeat(81)
            const outputMaxLength = sut.validate(props)
            expect(outputMaxLength.value![0].name).toBe("InvalidTitleLengthError")
        })
    })

    describe("Test description field", () => {
        
        it("Should  return InvalidDescriptionTypeError if an invalid description type is provided", () => {
            props.description = { } as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidDescriptionTypeError")
        })

        it("Should  return DescriptionNotProvidedError if title is not provided", () => {
            props.description = undefined as unknown as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("DescriptionNotProvidedError")
        })

        it("Should  return InvalidDescriptionLengthError if an invalid title length is provided", () => {
            props.description = "A".repeat(4)
            const outputMinLength = sut.validate(props)
            expect(outputMinLength.value![0].name).toBe("InvalidDescriptionLengthError")

            props.description = "A".repeat(501)
            const outputMaxLength = sut.validate(props)
            expect(outputMaxLength.value![0].name).toBe("InvalidDescriptionLengthError")
        })
    })

    describe("Test price field", () => {
        
        it("Should  return InvalidPriceTypeError if an invalid price type is provided", () => {
            props.price = "12" as unknown as number
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidPriceTypeError")
        })

        it("Should  return PriceNotProvidedError if price is not provided", () => {
            props.price = undefined as unknown as number
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("PriceNotProvidedError")
        })

        it("Should  return InvalidPriceLengthError if an invalid price length is provided", () => {
            props.price = 0.09
            const outputMinLength = sut.validate(props)
            expect(outputMinLength.value![0].name).toBe("InvalidPriceLengthError")

            const invalidPrice = 100000001
            props.price = invalidPrice
            const outputMaxLength = sut.validate(props)
            expect(outputMaxLength.value![0].name).toBe("InvalidPriceLengthError")
        })
    })
})