import { GetProductStockFacadeInterface } from "../../facades";
import { GetStockAvailabilityUsecaseFactory } from "../usecases";

export class GetProductStockFacadeFactory {
    static create(): GetProductStockFacadeInterface {
        return {
            execute: async (productId: string): Promise<number> => {
                const getStockAvailabilityUsecase = GetStockAvailabilityUsecaseFactory.create()
                const usecaseResult = await getStockAvailabilityUsecase.execute({
                    productStockId: productId
                })
                if(usecaseResult.isLeft()) return 0
                return  usecaseResult.value.stockCount
            }
        }
    }
}