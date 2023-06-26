import { PrismaClient } from "@prisma/client";
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../domain/repositories";


export class PrismaMercadopagoPaymentProviderRepository implements MercadopagoPaymentProviderRepositoryInterface {
    
    constructor(
        private readonly prismaClient: PrismaClient
    ){}
    
    async create(mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity): Promise<void> {
        await this.prismaClient.mercadopagoPaymentProvider.create({
            data: {
                ...mercadopagoPaymentProviderEntity.toJSON()
            }
        })
    }


}