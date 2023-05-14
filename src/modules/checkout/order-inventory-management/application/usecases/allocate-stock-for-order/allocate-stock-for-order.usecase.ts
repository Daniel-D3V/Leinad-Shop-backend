import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { allocateStockForOrderInputDto } from "./allocate-stock-for-order.dto";
import { EventEmitterInterface } from "@/modules/@shared/events";

export class AllocateStockForOrderUsecase implements UsecaseInterface {

    constructor(
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ orderId, products }: allocateStockForOrderInputDto): Promise<Either<Error[], null>> {



        return right(null)
    }
}