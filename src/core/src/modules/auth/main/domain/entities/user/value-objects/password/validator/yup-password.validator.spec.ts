import { YupPasswordValidator } from "./yup-password.validator"


describe("test YupPasswordValidator", () => {

    let yupPasswordValidator: YupPasswordValidator
    let props: YupPasswordValidator.ValidateFields

    beforeAll(() => {
        yupPasswordValidator = new YupPasswordValidator()
    })
    beforeEach(() => {
        props = {
            password: "AnyPassword1!"
        }
    })

    it("should return null if validation succeeds", () => {
        const result = yupPasswordValidator.validate(props)
        expect(result.isRight()).toBeTruthy()
        expect(result.value).toBeNull()
    })

    
    describe("test password", () => {

        it("Should return InvalidPasswordTypeError if password is not a string", () => {
            props.password = 1 as any
            const result = yupPasswordValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidPasswordTypeError")
        })

        it("Should return PasswordNotProvidedError if password is not provided", () => {
            props.password = undefined as any
            const result = yupPasswordValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("PasswordNotProvidedError")
        })

        it("Should return InvalidPasswordLengthError if password length is less than 8", () => {
            props.password = "A".repeat(7) 
            const result = yupPasswordValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidPasswordLengthError")
        })

        it("Should return InvalidPasswordLengthError if password length is greater than 100", () => {
            props.password = "A".repeat(101) 
            const result = yupPasswordValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidPasswordLengthError")
        })

        it("Should return InvalidPasswordFormatError if password does not match regex", () => {
            props.password = "any_password"
            const result = yupPasswordValidator.validate(props)
            expect(result.isLeft()).toBeTruthy()
            expect(result.value![0].name).toEqual("InvalidPasswordFormatError")
        })
    })
})