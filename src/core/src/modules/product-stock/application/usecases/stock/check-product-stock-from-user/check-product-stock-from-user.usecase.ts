import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { CheckProductStockFromUserUsecaseInterface } from "@/modules/product-stock/domain/usecases";
import { ProductStockNotFoundError } from "../../_errors";
import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { ProductStockNotFromUserError } from "./errors";

export class CheckProductStockFromUserUsecase implements CheckProductStockFromUserUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface
    ){}

    async execute({productStockId, userId }: CheckProductStockFromUserUsecaseInterface.InputDto): Promise<CheckProductStockFromUserUsecaseInterface.OutputDto> {
        
        const productStock = await this.productStockRepository.findById(productStockId)
        if(!productStock) return left([ new ProductStockNotFoundError() ])

        const getUserIdByAnnounceIdFacade = GetUserIdByAnnounceIdFacadeFactory.create()
        const announceUserId = await getUserIdByAnnounceIdFacade.execute(productStock.id)
        const isUserOwnStockAuto = userId === announceUserId
        if(!isUserOwnStockAuto) return left([ new ProductStockNotFromUserError() ])

        return right(null)
    }
}