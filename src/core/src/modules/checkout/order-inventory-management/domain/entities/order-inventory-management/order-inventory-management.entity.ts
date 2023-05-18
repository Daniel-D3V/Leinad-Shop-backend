import { BaseEntity } from "@/modules/@shared/domain";

export class OrderInventoryManagementEntity extends BaseEntity<OrderInventoryManagementEntity.Props> {

    private constructor(props: OrderInventoryManagementEntity.Props, id: string){
        super(props, id)
    }

    static create(props: OrderInventoryManagementEntity.Input, id: string): OrderInventoryManagementEntity {


        const orderInventoryManagementEntity = new OrderInventoryManagementEntity({
            products: props.products ?? []
        }, id)
        return orderInventoryManagementEntity
    }

    addProduct(product: OrderInventoryManagementEntity.Product): void {
        this.props.products.push(product)
    }

    findByProductId(productId: string): OrderInventoryManagementEntity.Product | undefined {
        return this.props.products.find(product => product.id === productId)
    }

    productHasValue(productId: string): boolean {
        const product = this.findByProductId(productId)
        return !!product?.value
    }

    getProductValue(productId: string): string | undefined {
        const product = this.findByProductId(productId)
        return product?.value
    }

    getProductsLength(): number {
        return this.props.products.length
    }

    toJSON(): OrderInventoryManagementEntity.PropsJSON {
        return {
            id: this.id,
            products: this.products
        }    
    }

    get products(): OrderInventoryManagementEntity.Product[] {
        return this.props.products
    }
}

export namespace OrderInventoryManagementEntity {
    
    export type Product = {
        id: string
        quantity: number
        value?: string
    }

    export type Input = {
        products?: Product[]
    }

    export type Props = {
        products: Product[]
    }

    export type PropsJSON = Props & { id: string }
}