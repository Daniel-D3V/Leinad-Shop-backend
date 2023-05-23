import { UsecaseInterface } from "@/modules/@shared/domain";
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client";


export class RemoveOutboxFactory {

    static create(): UsecaseInterface {

        const execute = async (id: string): Promise<any> => {
            await prismaClient.outbox.deleteMany({
                where: {
                    id
                }
            })
        }
        return {
            execute
        }
    }
}