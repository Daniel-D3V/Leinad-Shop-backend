import { CustomerEntity } from "../entities";

export interface CustomerRepositoryInterface {
    findById(id: string): Promise<CustomerEntity | null>
}