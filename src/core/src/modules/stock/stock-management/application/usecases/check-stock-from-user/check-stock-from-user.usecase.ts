import { left, right } from "@/modules/@shared/logic";
import { CheckStockFromUserUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases";
import { ProductStockNotFoundError } from "../_errors";
import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { ProductStockNotFromUserError } from "./errors";
import { StockManagementRepositoryInterface } from "../../../domain/repositories";

export class CheckStockFromUserUsecase implements CheckStockFromUserUsecaseInterface {

    constructor(
        private readonly stockManagementRepository: StockManagementRepositoryInterface
    ) { }

    async execute({ productStockId, userId }: CheckStockFromUserUsecaseInterface.InputDto): Promise<CheckStockFromUserUsecaseInterface.OutputDto> {

        const stockManagementEntity = await this.stockManagementRepository.findById(productStockId)
        if (!stockManagementEntity) return left([new ProductStockNotFoundError()])

        const getUserIdByAnnounceIdFacade = GetUserIdByAnnounceIdFacadeFactory.create()
        const announceUserId = await getUserIdByAnnounceIdFacade.execute(stockManagementEntity.id)
        const isUserOwnStockAuto = userId === announceUserId
        if (!isUserOwnStockAuto) return left([new ProductStockNotFromUserError()])

        return right(null)
    }
}