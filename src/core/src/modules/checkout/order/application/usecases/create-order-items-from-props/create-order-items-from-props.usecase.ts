import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { OrderItemEntity } from "@/modules/checkout/order/domain/entities";
import { InsufficientProductStockError, ProductNotFoundError, ProductOutOfStockError } from "./errors";
import { CreateOrderItemFromPropsUsecaseInterface, PlaceOrderUsecaseInterface } from "@/modules/checkout/order/domain/usecases";
import { NoProductsProvidedError } from "./errors";
import { AnnounceFacadeInterface } from "@/modules/announce/announce-management/facades";

export class CreateOrderItemsFromPropsUsecase implements CreateOrderItemFromPropsUsecaseInterface {
    
    constructor(
        private readonly announceFacade: AnnounceFacadeInterface
    ){}

    async execute(products: CreateOrderItemFromPropsUsecaseInterface.InputDto): Promise<CreateOrderItemFromPropsUsecaseInterface.OutputDto> {

        if (products.length === 0) return left([new NoProductsProvidedError()])

        const orderItems: OrderItemEntity[] = []
        for (const product of products) {

            const announceDetails = await this.announceFacade.getAnnounceDetails({
                announceId: product.announceId,
                announceTypeId: product.announceTypeId
            })
            if(!announceDetails) return left([ new ProductNotFoundError() ])               

            const stockValidationResult = this.validateStock(announceDetails.stockAvailable, product.quantity)
            if (stockValidationResult.isLeft()) return left(stockValidationResult.value)

            const orderItemEntity = OrderItemEntity.create({
                announceId: product.announceId,
                announceTypeId: product.announceTypeId,
                quantity: product.quantity,
                unitPrice: announceDetails.price,
                announceType: announceDetails.announceType,
                stockType: announceDetails.stockType
            })
            if (orderItemEntity.isLeft()) return left(orderItemEntity.value)

            orderItems.push(orderItemEntity.value)
        }
        return right(orderItems)

    }

    validateStock(quantityAvailable: number, quantityRequied: number): Either<Error[], null> {
        if (quantityAvailable <= 0) return left([ new ProductOutOfStockError() ])
        if (quantityAvailable < quantityRequied) return left([ new InsufficientProductStockError() ])
        return right(null)
    }

}