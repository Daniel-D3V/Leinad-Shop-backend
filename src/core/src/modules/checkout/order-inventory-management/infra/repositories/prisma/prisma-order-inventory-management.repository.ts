import { PrismaClient } from "@prisma/client";
import { OrderInventoryManagementEntity } from "../../../domain/entities";
import { OrderInventoryManagementRepositoryInterface } from "../../../domain/repositories";


export class PrismaOrderInventoryManagementRepository implements OrderInventoryManagementRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    create(orderInventoryManagement: OrderInventoryManagementEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}