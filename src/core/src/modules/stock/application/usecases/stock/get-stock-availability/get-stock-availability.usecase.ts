import { Either, left, right } from "@/modules/@shared/logic";
import { ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockGatewayInterface } from "@/modules/stock/domain/gateway";
import { GetStockAvailabilityUsecaseInterface } from "@/modules/stock/domain/usecases";


export class GetStockAvailabilityUsecase implements GetStockAvailabilityUsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly productStockGateway: ProductStockGatewayInterface
    ) { }

    async execute({ productStockId }: GetStockAvailabilityUsecaseInterface.InputDto): Promise<GetStockAvailabilityUsecaseInterface.OutputDto> {

        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if (!productStockEntity) return left([new ProductStockNotFoundError()])

        let stockCount: number = 0
        if (productStockEntity.isStockNormal()) {
            stockCount = await this.productStockGateway.getProductStockNormalCount(productStockEntity.id)
        }
        else if (productStockEntity.isStockAuto()) {
            stockCount = await this.productStockGateway.getProductStockAutoCount(productStockEntity.id)
        }

        return right({
            stockCount,
            stockType: productStockEntity.stockType
        })
    }
}