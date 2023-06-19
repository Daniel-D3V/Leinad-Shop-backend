import { VerificationCodeEntity } from "./verification-code.entity";


describe("Test VerificationCodeEntity", () => {

    let sut: VerificationCodeEntity;
    let props: VerificationCodeEntity.Input;
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            code: "code",
            expirationDate: new Date()
        }
        sut = VerificationCodeEntity.create(props, id);
    })

    it("should create a new VerificationCodeEntity", () => {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toEqual({ ...props, id });
    })
})