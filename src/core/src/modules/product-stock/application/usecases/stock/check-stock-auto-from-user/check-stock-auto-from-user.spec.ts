import { CheckStockAutoFromUserUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import { CheckStockAutoFromUserUsecase } from "./check-stock-auto-from-user.usecase"
import { ProductStockAutoRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"


describe('Test CheckStockAutoFromUserUsecase', () => { 

    let sut: CheckStockAutoFromUserUsecase
    let props: CheckStockAutoFromUserUsecaseInterface.InputDto
    let productStockAutoRepository: ProductStockAutoRepositoryInterface
    let ProductStockRepository: ProductStockRepositoryInterface
    

    it('should be defined', () => {
        expect(true).toBeTruthy()
    })
})