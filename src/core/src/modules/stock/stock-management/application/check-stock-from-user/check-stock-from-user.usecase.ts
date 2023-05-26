import { left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import { CheckStockFromUserUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases";
import { ProductStockNotFoundError } from "../../../_base/_errors";
import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { ProductStockNotFromUserError } from "./errors";

export class CheckStockFromUserUsecase implements CheckStockFromUserUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface
    ) { }

    async execute({ productStockId, userId }: CheckStockFromUserUsecaseInterface.InputDto): Promise<CheckStockFromUserUsecaseInterface.OutputDto> {

        const productStock = await this.productStockRepository.findById(productStockId)
        if (!productStock) return left([new ProductStockNotFoundError()])

        const getUserIdByAnnounceIdFacade = GetUserIdByAnnounceIdFacadeFactory.create()
        const announceUserId = await getUserIdByAnnounceIdFacade.execute(productStock.id)
        const isUserOwnStockAuto = userId === announceUserId
        if (!isUserOwnStockAuto) return left([new ProductStockNotFromUserError()])

        return right(null)
    }
}