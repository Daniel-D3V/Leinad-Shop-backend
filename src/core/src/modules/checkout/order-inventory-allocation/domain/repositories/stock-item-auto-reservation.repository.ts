import { StockItemAutoReservationModel } from "../models";

export interface StockItemAutoReservationRepositoryInterface {

    create(stockItemAutoReservationModel: StockItemAutoReservationModel): Promise<void>
}