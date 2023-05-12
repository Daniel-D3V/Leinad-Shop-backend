import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import { CreateOrderItemsFromDtoUsecase } from "./helpers";

export class PlaceOrderUsecase implements UsecaseInterface {

    constructor(
     
    ){}

    async execute({ customerId, products }: PlaceOrderInputDto): Promise<Either<Error[], PlaceOrderOutputDto>> {

        const createOrderItemsFromDtoUsecase = new CreateOrderItemsFromDtoUsecase()
        const orderItems = await createOrderItemsFromDtoUsecase.execute(products)
        if(orderItems.isLeft()) return left(orderItems.value)

        

        return right(null)
    }

 
}