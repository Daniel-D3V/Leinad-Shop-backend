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
    
    it("Should call compare password from password value object", () => {
        const passwordSpy = jest.spyOn(PasswordValueObject.prototype, "comparePassword") 
        const plainTextPassword = "any_password"
        sut.comparePassword(plainTextPassword)
        expect(passwordSpy).toHaveBeenCalledTimes(1)
        expect(passwordSpy).toHaveBeenCalledWith(plainTextPassword)
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

    describe("Test UserEntity creatingExistingUser", () => {
    
        it("Should create a new UserEntity", () => {
            sut = UserEntity.createExistingUser(props, id).value as UserEntity
            expect(sut).toBeInstanceOf(UserEntity)
            expect(sut.id).toBe(id)
        })
        
        it("Should return left if domain validator returns an error", () => {
            const validatorError = new Error("ValidatorError")
            jest.spyOn(domainValidator, "validate").mockReturnValue({
                isLeft: () => true,
                value: [ validatorError ]
            } as any)

            const sut = UserEntity.createExistingUser(props, id)
            expect(sut.value).toEqual([ validatorError ])
        })

        it("Should create PasswordValueObject with correct value ", () => {
            const passwordSpy = jest.spyOn(PasswordValueObject, "create")
            expect(passwordSpy).toHaveBeenCalledWith({
                password: props.password
            })
        })
    })

})