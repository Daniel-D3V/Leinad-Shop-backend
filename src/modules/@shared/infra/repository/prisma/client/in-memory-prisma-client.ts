import { PrismaClient } from "@prisma/client"

export const inMemoryPrismaClient = new PrismaClient({
    datasources: {
      sqlite: {

      },
      
    },
});
