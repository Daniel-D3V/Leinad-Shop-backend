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

        it("Should return UsernameNotProvidedError if username is not provided", () => {
            props.username = undefined as any
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("UsernameNotProvidedError")
        })

        it("Should return InvalidUsernameLengthError if username length is less than 5", () => {
            props.username = "1234"
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidUsernameLengthError")
        })

        it("Should return InvalidUsernameLengthError if username length is greater than 30", () => {
            props.username = "A".repeat(31)
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidUsernameLengthError")
        })
    })

    describe("test email", () => {
            
        it("Should return InvalidEmailTypeError if email is not a string", () => {
            props.email = 1 as any
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidEmailTypeError")
        })

        it("Should return InvalidEmailFormatError if email is not a valid email", () => {
            props.email = "any_email"
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidEmailFormatError")
        })

        it("Should return EmailNotProvidedError if email is not provided", () => {
            props.email = undefined as any
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("EmailNotProvidedError")
        })

        it("Should return InvalidEmailLengthError if email length is greater than 255", () => {
            props.email = "A".repeat(251) + "@gmail.com"
            const result = yupUserValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidEmailLengthError")
        })

    })
})