import { StockItemManualReservationModel } from "../domain/models";

export interface StockItemManualReservationRepositoryInterface {

    create(stockItemManualReservationModel: StockItemManualReservationModel): Promise<void>
}