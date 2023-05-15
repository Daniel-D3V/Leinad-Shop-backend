import { YupUserValidator } from "./yup-user.validator"


describe("test YupUserValidator", () => {

    let yupUserValidator: YupUserValidator
    let props: YupUserValidator.ValidateFields

    beforeAll(() => {
        yupUserValidator = new YupUserValidator()
    })
    beforeEach(() => {
        props = {
            username: "any_username",
            email: "any_email@gmail.com",
            password: "any_password"
        }
    })

    it("should return null if validation succeeds", () => {
        const result = yupUserValidator.validate(props)
        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeNull()
    })

    describe("test username", () => {

        it("Should return InvalidUsernameTypeError if username is not a string", () => {
            props.username = 1 as any
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidUsernameTypeError")
        })
    })
})