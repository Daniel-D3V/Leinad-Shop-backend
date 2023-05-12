import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import { GetProductStockFacadeFactory } from "@/modules/product-stock/factories";
import { CheckAnnounceExistsFacadeFactory, GetAnnouncePriceFacadeFactory } from "@/modules/announce/announce-admin/factories";

export class PlaceOrderUsecase implements UsecaseInterface {

    constructor(
     
    ){}

    async execute(input: PlaceOrderInputDto): Promise<Either<Error[], PlaceOrderOutputDto>> {

        const checkAnnounceExistsFacade = CheckAnnounceExistsFacadeFactory.create()
        const getProductStockFacade = GetProductStockFacadeFactory.create()
        const getAnnouncePriceFacade = GetAnnouncePriceFacadeFactory.create()

        return right(null)
    }
}