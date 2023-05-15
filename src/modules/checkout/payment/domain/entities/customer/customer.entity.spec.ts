import { CustomerEntity } from "./customer.entity"


describe('Test CustomerEntity', () => { 

    let sut: CustomerEntity
    let props: CustomerEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            name: "any_name",
            email: "any_email"
        }
        sut = CustomerEntity.create(props, id)
    })

    it("Should create a CustomerEntity instance", () => {
        sut = CustomerEntity.create(props, id)
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

})