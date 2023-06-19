import { VerificationCodeEntity } from "./verification-code.entity";


describe("Test VerificationCodeEntity", () => {

    let sut: VerificationCodeEntity;
    let props: VerificationCodeEntity.Input;
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            userId: "any_user_id",
            code: "code",
            expirationDate: new Date()
        }
        sut = VerificationCodeEntity.create(props, id);
    })
    
    it("should create a new VerificationCodeEntity", () => {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toEqual({ ...props, id });
    })
    
    it("should create a new VerificationCodeEntity with random code", () => {
        delete props.code
        const sut = VerificationCodeEntity.create(props);
        expect(sut.code).toBeDefined();
    })

    it("should create a new VerificationCodeEntity with expiration date", () => {
        delete props.expirationDate
        const sut = VerificationCodeEntity.create(props);
        expect(sut.expirationDate).toBeDefined();
    })

    it("should return true if code is expired", () => {
        const expirationDate = new Date()
        expirationDate.setSeconds(new Date().getSeconds() - 1000)
        const sut = VerificationCodeEntity.create({
            ...props,
            expirationDate
        });
        expect(sut.isExpired()).toBeTruthy();
    })

    it("should return false if code is not expired", () => {
        const expirationDate = new Date()
        expirationDate.setSeconds(new Date().getSeconds() + 1000)
        const sut = VerificationCodeEntity.create({
            ...props,
            expirationDate
        });
        expect(sut.isExpired()).toBeFalsy();
    })


})