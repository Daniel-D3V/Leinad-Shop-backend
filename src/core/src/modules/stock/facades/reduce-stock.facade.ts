import { Either } from "@/modules/@shared/logic";

export interface ReduceStockFacadeInterface {
    execute(productId: string, quantity: number): Promise<Either<Error, null>>
} 