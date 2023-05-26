import { YupCategoryValidator } from "./yup-category.validator"


describe("test YubCategoryValidator", () => {

    let yupCategoryValidator: YupCategoryValidator
    let props: YupCategoryValidator.ValidateFields

    beforeAll(() => {
        yupCategoryValidator = new YupCategoryValidator()
    })

    beforeEach(() => {
        props = {
            description: "any_description",
            title: "any_title",
        }
    })

    describe("Test title field", () => {

        it("should return InvalidTitleTypeError if an invalid title type is provided ", () => {
            const output = yupCategoryValidator.validate({
                ...props,
                title: 123 as any
            })
            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidTitleTypeError")
        })

        it("should return TitleNotProvidedError if title is not provided ", () => {
            const output = yupCategoryValidator.validate({
                ...props,
                title: undefined as any
            })
            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("TitleNotProvidedError")
        })

        it("should return InvalidTitleLengthError if an invalid title lenght is provided ", () => {
            const ouputMinLenght = yupCategoryValidator.validate({
                ...props,
                title: "3".repeat(4)
            })
            if (ouputMinLenght.isRight()) throw new Error()
            expect(ouputMinLenght.value[0].name).toBe("InvalidTitleLengthError")

            const ouputMaxLenght = yupCategoryValidator.validate({
                ...props,
                title: "A".repeat(256)
            })
            if (ouputMaxLenght.isRight()) throw new Error()
            expect(ouputMaxLenght.value[0].name).toBe("InvalidTitleLengthError")
        })

    })

    describe("Test description field", () => {

        it("should return InvalidDescriptionTypeError if an invalid description type is provided ", () => {
            const output = yupCategoryValidator.validate({
                ...props,
                description: 123 as any
            })
            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidDescriptionTypeError")
        })

        it("should return DescriptionNotProvidedError if description is not provided ", () => {
            const output = yupCategoryValidator.validate({
                ...props,
                description: undefined as any
            })
            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("DescriptionNotProvidedError")
        })

        it("should return InvalidDescriptionLengthError if an invalid description lenght is provided ", () => {
            const ouputMinLenght = yupCategoryValidator.validate({
                ...props,
                description: "3".repeat(4)
            })
            if (ouputMinLenght.isRight()) throw new Error()
            expect(ouputMinLenght.value[0].name).toBe("InvalidDescriptionLengthError")

            const ouputMaxLenght = yupCategoryValidator.validate({
                ...props,
                description: "A".repeat(501)
            })
            if (ouputMaxLenght.isRight()) throw new Error()
            expect(ouputMaxLenght.value[0].name).toBe("InvalidDescriptionLengthError")
        })
    })


})