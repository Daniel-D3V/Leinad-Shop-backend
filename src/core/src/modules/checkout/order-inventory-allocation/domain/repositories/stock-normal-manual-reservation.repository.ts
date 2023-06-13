import { StockNormalManualReservationModel } from "../models";

export interface StockNormalManualReservationRepositoryInterface {

    create(stockNormalManualReservationModel: StockNormalManualReservationModel): Promise<void>
}