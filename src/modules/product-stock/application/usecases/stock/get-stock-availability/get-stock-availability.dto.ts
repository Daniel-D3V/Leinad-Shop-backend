import { ProductStockEntity } from "@/modules/product-stock/domain/entities"

export type GetStokAvailabilityInputDto = {
    productStockId: string
}

export type GetStokAvailabilityOutputDto = {
    stockCount: number
    stockType: ProductStockEntity.StockType
}