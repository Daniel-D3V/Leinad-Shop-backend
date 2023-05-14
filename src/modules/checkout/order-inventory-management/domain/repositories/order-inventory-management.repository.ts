import { OrderInventoryManagementEntity } from "../entities";

export interface OrderInventoryManagementRepositoryInterface {
    create(orderInventoryManagement: OrderInventoryManagementEntity): Promise<void>
}