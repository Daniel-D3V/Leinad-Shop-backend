import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { OrderItemEntity } from "@/modules/checkout/order/domain/entities";
import { InsufficientProductStockError, ProductNotFoundError, ProductOutOfStockError } from "../errors";
import { CheckAnnounceExistsFacadeFactory, GetAnnouncePriceFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { PlaceOrderUsecaseInterface } from "@/modules/checkout/order/domain/usecases";
import { NoProductsProvidedError } from "./errors";
import { StockManagementFacadeFactory } from "@/modules/stock/stock-management/factories";

export class CreateOrderItemsFromPropsUsecase implements UsecaseInterface {
    
    constructor(){}

    async execute(products: PlaceOrderUsecaseInterface.InputDto["products"]): Promise<Either<Error[], OrderItemEntity[]>> {

        if (products.length === 0) return left([new NoProductsProvidedError()])

        const orderItems: OrderItemEntity[] = []
        for (const product of products) {
            // check if product exists
            // const stockValidationResult = await this.validateStock(product.quantity, product.id)
            // if (stockValidationResult.isLeft()) return left(stockValidationResult.value)
            // get product price

            const stockManagementFacade = StockManagementFacadeFactory.create()
            const output = await stockManagementFacade.consultStock({
                announceId: product.id,
                itemId: product.itemId
            })

            const announcePrice = await this.getAnnouncePrice(product.id, product.itemId)

            console.log(output, announcePrice)

            const orderItemEntity = OrderItemEntity.create({
                productId: product.id,
                quantity: product.quantity,
                unitPrice: announcePrice
            })
            if (orderItemEntity.isLeft()) return left(orderItemEntity.value)

            orderItems.push(orderItemEntity.value)
        }
        return right(orderItems)

    }

    // private async validateStock(requiredQuantity: number, productId: string): Promise<Either<Error[], null>> {
    //     const productStockQuantity = await this.getProductStockQuantity(productId) ?? 0
    //     if (productStockQuantity <= 0) return left([new ProductOutOfStockError(productId)])
    //     if (productStockQuantity < requiredQuantity) return left([
    //         new InsufficientProductStockError(productId, requiredQuantity, productStockQuantity)
    //     ])
    //     return right(null)
    // }

    private async getAnnouncePrice(announceId: string, announceItemId?: string): Promise<number> {
        const getAnnouncePriceFacade = GetAnnouncePriceFacadeFactory.create()
        const announcePrice = await getAnnouncePriceFacade.execute({
            announceId,
            announceItemId
        })
        return announcePrice ?? 0
    }

    // private async getProductStockQuantity(id: string): Promise<number> {
    //     const getProductStockFacade = GetProductStockFacadeFactory.create()
    //     const productStock = await getProductStockFacade.execute(id)
    //     return productStock ?? 0
    // }
}