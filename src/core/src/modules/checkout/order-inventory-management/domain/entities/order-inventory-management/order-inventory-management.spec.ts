import { OrderInventoryManagementEntity } from "./order-inventory-management.entity"

describe("Test OrderInventoryManagementEntity", () => {

    let sut: OrderInventoryManagementEntity
    let props: OrderInventoryManagementEntity.Input
    let id: string


    beforeEach(() => {
        id = "any_id"
        props = {
            products: [
                { announceId: "1", announceTypeId: "1", quantity: 1 },
                { announceId: "2", announceTypeId: "2", quantity: 2 },
                { announceId: "3", announceTypeId: "3", quantity: 3 },
                { announceId: "4", announceTypeId: "4", quantity: 4, value: "any_value" }
            ]
        }
        sut = OrderInventoryManagementEntity.create(props, id)
    })

    it("Should create a new OrderInventoryManagementEntity", () => {
        expect(sut).toBeDefined()
        expect(sut.toJSON()).toEqual({
            id,
            products: props.products!
        })
    })

    it("Should add a new product", () => {
        const newProduct = { announceId: "5",announceTypeId: "5", quantity: 5 }
        sut.addProduct(newProduct) 
        expect(sut.products).toEqual([
            ...props.products!
        ])
    })

    it("Should return the products", () => {
        expect(sut.products).toEqual([
            ...props.products!
        ])
    })

    it("Should return the product by id", () => {
        const product = sut.findByProductId("1")
        expect(product).toEqual({ announceId: "1", announceTypeId: "1", quantity: 1 },)
    })

    it("Should return undefined if the product does not exist", () => {
        const product = sut.findByProductId("5")
        expect(product).toBeUndefined()
    })

    it("Should return true if the product has value", () => {
        const productHasValue = sut.productHasValue("4")
        expect(productHasValue).toBeTruthy()
    })

    it("Should return false if the product does not have value", () => {
        const productHasValue = sut.productHasValue("1")
        expect(productHasValue).toBeFalsy()
    })

    it("Should return the product value", () => {
        const productValue = sut.getProductValue("4")
        expect(productValue).toEqual("any_value")
    })

    it("Should return undefined if the product does not have value", () => {
        const productValue = sut.getProductValue("1")
        expect(productValue).toBeUndefined()
    })

    it("Should return the products length", () => {
        const productsLength = sut.getProductsLength()
        expect(productsLength).toEqual(4)
    })
})