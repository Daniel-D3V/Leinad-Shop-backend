import { left, right } from "@/modules/@shared/logic";
import { ProductStockAutoRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import { CheckStockAutoFromUserUsecaseInterface } from "@/modules/stock/domain/usecases";
import { ProductStockAutoNotFoundError, } from "../../../_base/_errors";
import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { ProductStockAutoNotFromUserError } from "./errors";

export class CheckStockAutoFromUserUsecase implements CheckStockAutoFromUserUsecaseInterface {

    constructor(
        private readonly productStockAutoRepository: ProductStockAutoRepositoryInterface
    ) { }

    async execute({ productStockAutoId, userId }: CheckStockAutoFromUserUsecaseInterface.InputDto): Promise<CheckStockAutoFromUserUsecaseInterface.OutputDto> {

        const productStockAuto = await this.productStockAutoRepository.findById(productStockAutoId)
        if (!productStockAuto) return left([new ProductStockAutoNotFoundError()])

        const getUserIdByAnnounceIdFacade = GetUserIdByAnnounceIdFacadeFactory.create()
        const announceUserId = await getUserIdByAnnounceIdFacade.execute(productStockAuto.productStockId)
        const isUserOwnStockAuto = userId === announceUserId
        if (!isUserOwnStockAuto) return left([new ProductStockAutoNotFromUserError()])

        return right(null)
    }
}