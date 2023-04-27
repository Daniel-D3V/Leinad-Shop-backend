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

    it("should return InvalidTitleTypeError if an invalid variable type is provided ", () => {
        const output = yupCategoryValidator.validate({
            ...props,
            title: 123 as any
        })
        if(output.isRight()) throw new Error()
        expect(output.value[0].name).toBe("InvalidTitleTypeError")
    })
})