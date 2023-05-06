import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { GetStokAvailabilityInputDto, GetStokAvailabilityOutputDto } from "./get-stock-availability.dto";
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories";
import { ProductStockNotFoundError } from "../../_errors";
import { ProductStockGatewayInterface } from "@/modules/product-stock/domain/gateway";


export class GetStockAvailabilityUsecase implements UsecaseInterface {

    constructor(
        private readonly productStockRepository: ProductStockRepositoryInterface,
        private readonly productStockGateway: ProductStockGatewayInterface
    ){}

    async execute({ productStockId }: GetStokAvailabilityInputDto): Promise<Either<Error[], GetStokAvailabilityOutputDto>> {
        
        const productStockEntity = await this.productStockRepository.findById(productStockId)
        if(!productStockEntity) return left([ new ProductStockNotFoundError() ])

        let stockCount: number = 0
        if(productStockEntity.isStockNormal()){
            stockCount = await this.productStockGateway.getProductStockNormalCount(productStockEntity.id)   
        }
        else if(productStockEntity.isStockAuto()){
            stockCount = await this.productStockGateway.getProductStockAutoCount(productStockEntity.id)   
        }
        
        return right({ 
            stockCount,
            stockType: productStockEntity.stockType
        })
    }
}