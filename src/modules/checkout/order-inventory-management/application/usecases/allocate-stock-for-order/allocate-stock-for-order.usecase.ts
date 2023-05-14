import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { allocateStockForOrderInputDto } from "./allocate-stock-for-order.dto";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { GetProductStockTypeFacadeInterface, ReduceStockFacadeInterface } from "@/modules/product-stock/facades";
import { StockAllocationForOrderFailedEvent } from "./events";
import { ProductNotFoundError } from "./errors";

export class AllocateStockForOrderUsecase implements UsecaseInterface {

    constructor(
        private readonly getProductStockTypeFacade: GetProductStockTypeFacadeInterface,
        private readonly reduceStockFacade: ReduceStockFacadeInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ orderId, products }: allocateStockForOrderInputDto): Promise<Either<Error[], null>> {

        for(const product of products){

            const stockType = await this.getProductStockTypeFacade.execute(product.id)
            if(!stockType) left([ new ProductNotFoundError() ])

            if(stockType === "AUTO"){
                
            }else {

            }

            const reduceStockResult = await this.reduceStock(product, orderId)
            if(reduceStockResult.isLeft()) left(reduceStockResult.value)


        }

        return right(null)
    }

    async reduceStock(product: { id: string, quantity: number }, orderId: string ): Promise<Either<Error[], null>> {
        const reduceStockResult = await this.reduceStockFacade.execute(product.id, product.quantity)
            if(reduceStockResult.isLeft()){
                await this.eventEmitter.emit(this.createFailStockAllocationEvent(reduceStockResult.value, orderId))
                return left([ reduceStockResult.value ])
            }
        return right(null)
    }

    createFailStockAllocationEvent(error: Error, orderId: string): StockAllocationForOrderFailedEvent {
        return new StockAllocationForOrderFailedEvent({
            orderId,
            logs: {
                reason: error.name,
                description: error.message
            }
        })
    }

    
}