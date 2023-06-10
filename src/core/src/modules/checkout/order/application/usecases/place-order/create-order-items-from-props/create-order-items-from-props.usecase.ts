import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { OrderItemEntity } from "@/modules/checkout/order/domain/entities";
import { InsufficientProductStockError, ProductNotFoundError, ProductOutOfStockError } from "../errors";
import { PlaceOrderUsecaseInterface } from "@/modules/checkout/order/domain/usecases";
import { NoProductsProvidedError } from "./errors";
import { ConsultStockFacadeFactory } from "@/modules/stock/factories/facades";
import { ConsultPriceFacadeFactory } from "@/modules/announce/announce-management/factories";

export class CreateOrderItemsFromPropsUsecase implements UsecaseInterface {
    
    constructor(){}

    async execute(products: PlaceOrderUsecaseInterface.InputDto["products"]): Promise<Either<Error[], OrderItemEntity[]>> {

        if (products.length === 0) return left([new NoProductsProvidedError()])

        const orderItems: OrderItemEntity[] = []
        for (const product of products) {

            const consultStockFacade = ConsultStockFacadeFactory.create()
            let stockAvailable = await consultStockFacade.consult({
                announceId: product.announceId,     
                announceTypeId: product.announceTypeId
            })                                          
            if(stockAvailable === null) stockAvailable = 0                 
            if (stockAvailable <= 0) return left([new ProductOutOfStockError(product.announceId)])
            if (stockAvailable < product.quantity) return left([
                new InsufficientProductStockError(product.announceId, product.quantity, stockAvailable)
            ])

            const consultPriceFacade = ConsultPriceFacadeFactory.create()
            let announcePrice = await consultPriceFacade.consult({
                announceId: product.announceId,
                announceTypeId: product.announceTypeId
            })
            if(announcePrice === null) announcePrice = 0       

            const orderItemEntity = OrderItemEntity.create({
                announceId: product.announceId,
                announceTypeId: product.announceTypeId,
                quantity: product.quantity,
                unitPrice: announcePrice
            })
            if (orderItemEntity.isLeft()) return left(orderItemEntity.value)

            orderItems.push(orderItemEntity.value)
        }
        return right(orderItems)

    }



}