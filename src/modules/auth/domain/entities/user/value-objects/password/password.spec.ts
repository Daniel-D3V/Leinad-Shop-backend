import { DomainValidator } from "@/modules/@shared/domain/validator"
import { PasswordValueObject } from "./password.value-object"
import { mockDomainValidator } from "@/modules/@shared/tests"
import { PasswordValidatorFactory } from "./validator"

jest.mock("./validator")

describe("Test passwordValueObject", () => {

    let sut: PasswordValueObject
    let props: PasswordValueObject.Props
    let domainValidator: DomainValidator<any>

    beforeEach(() => {

        domainValidator = mockDomainValidator()
        jest.spyOn(PasswordValidatorFactory, "create").mockReturnValue(domainValidator)

        props = {
            password: "AnyPassword1!"
        }
        sut = PasswordValueObject.create(props).value as PasswordValueObject
    })

    it("Should create a new password", () => {
        const sut = PasswordValueObject.create(props).value as PasswordValueObject
        expect(sut).toBeInstanceOf(PasswordValueObject)
    })

    it("Should return left if domain validator returns an error", () => {
        const validatorError = new Error("ValidatorError")
        jest.spyOn(domainValidator, "validate").mockReturnValue({
            isLeft: () => true,
            value: [ validatorError ]
        } as any)

        const sut = PasswordValueObject.create(props)
        expect(sut.value).toEqual([ validatorError ])
    })

    it("Should return right if domain validator returns no error", () => {
        const sut = PasswordValueObject.create(props)
        expect(sut.isRight()).toBeTruthy()
    })

    it("Should return the hashed password", () => {
        expect(sut.value).not.toBe(props.password)
    })

    it("Should compare the password", () => {
        expect(sut.comparePassword(props.password)).toBeTruthy()
    })

    it("Should not compare the password", () => {
        expect(sut.comparePassword("AnyPassword2!")).toBeFalsy()
    })

    

})