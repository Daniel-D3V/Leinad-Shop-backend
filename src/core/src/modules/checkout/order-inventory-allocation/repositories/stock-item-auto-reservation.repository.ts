import { StockItemAutoReservationModel } from "../domain/models";

export interface StockItemAutoReservationRepositoryInterface {

    create(stockItemAutoReservationModel: StockItemAutoReservationModel): Promise<void>
}