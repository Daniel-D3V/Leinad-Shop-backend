import { StockNormalAutoReservationModel } from "../models";

export interface StockNormalAutoReservationRepositoryInterface {

    create(stockNormalAutoReservationModel: StockNormalAutoReservationModel): Promise<void>
}