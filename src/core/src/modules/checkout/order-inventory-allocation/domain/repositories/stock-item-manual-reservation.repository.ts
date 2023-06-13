import { StockItemManualReservationModel } from "../models";

export interface StockItemManualReservationRepositoryInterface {

    create(stockItemManualReservationModel: StockItemManualReservationModel): Promise<void>
}