import { YupAnnounceItemValidator } from "./yup-announce-item-validator"

describe("Test YupAnnounceItemValidator", () => {

    let sut: YupAnnounceItemValidator
    let props: YupAnnounceItemValidator.ValidateFields

    beforeEach(() => {
        props = {
            title: "any_title"
        }
        sut = new YupAnnounceItemValidator()
    })

   

    describe("Test Title", () => {
        it("Should return InvalidPriceTypeError if title type is invalid", () => {
            props.title = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidTitleTypeError")
        })

        it("Should return TitleNotProvidedError if title is not provided", () => {
            props.title = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("TitleNotProvidedError")
        })

        it("Should return InvalidTitleLengthError if the max length of the title provided is invalid", () => {
            props.title = "a".repeat(151)
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidTitleLengthError")
        })

        it("Should return InvalidTitleLengthError if the min length of the title provided is invalid", () => {
            props.title = "a".repeat(4)
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidTitleLengthError")
        })

    })
})