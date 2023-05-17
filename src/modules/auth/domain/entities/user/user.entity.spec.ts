import { DomainValidator } from "@/modules/@shared/domain/validator";
import { UserEntity } from "./user.entity"
import { UserValidatorFactory } from "./validator";
import { mockDomainValidator } from "@/modules/@shared/tests";
import { PasswordValueObject } from "./value-objects";


jest.mock("./validator")

describe("Test UserEntity", () => {

    let sut: UserEntity
    let props: UserEntity.Input
    let domainValidator: DomainValidator<any>
    let id: string

    beforeEach(() => {
        id = "any_id"
        domainValidator = mockDomainValidator()
        jest.spyOn(UserValidatorFactory, "create").mockReturnValue(domainValidator)
        props = {
            username: "any_username",
            email: "any_mail@mail.com",
            password: "Anypassword1!"
        }
        sut = UserEntity.create(props).value as UserEntity
    })
    
    describe("Test UserEntity Create", () => {
    
        it("Should create a new UserEntity", () => {
            sut = UserEntity.create(props).value as UserEntity
            expect(sut).toBeInstanceOf(UserEntity)
        })
        
        it("Should return left if domain validator returns an error", () => {
            const validatorError = new Error("ValidatorError")
            jest.spyOn(domainValidator, "validate").mockReturnValue({
                isLeft: () => true,
                value: [ validatorError ]
            } as any)

            const sut = UserEntity.create(props)
            expect(sut.value).toEqual([ validatorError ])
        })

        it("Should return left if password returns an error", () => {
            const passwordError = new Error("PasswordError")
            jest.spyOn(PasswordValueObject, "create").mockReturnValue({
                isLeft: () => true,
                value: [ passwordError ]
            } as any)

            const sut = UserEntity.create(props)
            expect(sut.value).toEqual([ passwordError ])
        })

        it("Should return errors from domainValidator and password", () => {

            const validatorError = new Error("ValidatorError")
            jest.spyOn(domainValidator, "validate").mockReturnValue({
                isLeft: () => true,
                value: [ validatorError ]
            } as any)

            const passwordError = new Error("PasswordError")
            jest.spyOn(PasswordValueObject, "create").mockReturnValue({
                isLeft: () => true,
                value: [ passwordError ]
            } as any)

            const sut = UserEntity.create(props)
            expect(sut.value).toEqual([ validatorError, passwordError ])
        })

        it("Should call PasswordValueObject.create once", () => {
            const passwordSpy = jest.spyOn(PasswordValueObject, "create")
            expect(passwordSpy).toHaveBeenCalledTimes(1)
        })
    })
})