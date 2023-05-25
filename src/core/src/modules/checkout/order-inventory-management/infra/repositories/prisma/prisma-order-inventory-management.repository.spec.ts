import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";
import { PrismaOrderInventoryManagementRepository } from "./prisma-order-inventory-management.repository";


describe("Test PrismaOrderInventoryManagementRepository", () => {

    let sut: PrismaOrderInventoryManagementRepository;

    beforeEach(() => {

        sut = new PrismaOrderInventoryManagementRepository(prismaClient);

    })

    it("Should create a new OrderInventoryManagementEntity", async () => {
        
    })
})