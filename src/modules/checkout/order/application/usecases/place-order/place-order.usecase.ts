import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import { GetProductStockFacadeFactory } from "@/modules/product-stock/factories";
import { CheckAnnounceExistsFacadeFactory, GetAnnouncePriceFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { OrderItemEntity } from "../../../domain/entities";
import { InsufficientProductStockError, ProductNotFoundError, ProductOutOfStockError } from "./errors";
import { CreateOrderItemsFromDtoUsecase } from "./helpers";

export class PlaceOrderUsecase implements UsecaseInterface {

    constructor(
     
    ){}

    async execute({ customerId, products }: PlaceOrderInputDto): Promise<Either<Error[], PlaceOrderOutputDto>> {

        const createOrderItemsFromDtoUsecase = new CreateOrderItemsFromDtoUsecase()
        const createOrderItemsResult = await createOrderItemsFromDtoUsecase.execute(products)
        if(createOrderItemsResult.isLeft()) return left(createOrderItemsResult.value)

        return right(null)
    }

 
}