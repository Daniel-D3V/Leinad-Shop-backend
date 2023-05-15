import { DomainValidator } from "@/modules/@shared/domain/validator";
import { UserEntity } from "./user.entity"
import { UserValidatorFactory } from "./validator";
import { mockDomainValidator } from "@/modules/@shared/tests";


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
            password: "any_password"
        }
        sut = UserEntity.create(props, id).value as UserEntity
    })


    it("Should create a new UserEntity", () => {
        sut = UserEntity.create(props, id).value as UserEntity
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })
})