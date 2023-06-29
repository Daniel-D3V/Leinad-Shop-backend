import { MercadopagoPaymentProvider, PrismaClient } from "@prisma/client";
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities";
import { MercadopagoPaymentProviderRepositoryInterface } from "../../../domain/repositories";

class PrismaMercadopagoPaymentProvider {

    static toDomain(prismaMercadopago: MercadopagoPaymentProvider): MercadopagoPaymentProviderEntity {
        const mercadopagoPaymentProviderEntity = MercadopagoPaymentProviderEntity.create({
            ...prismaMercadopago,
            paymentMethod: prismaMercadopago.paymentMethod as MercadopagoPaymentProviderEntity.PaymentMethods
        }, prismaMercadopago.id)
        
        if(prismaMercadopago.status === "CANCELLED") mercadopagoPaymentProviderEntity.cancel()
        if(prismaMercadopago.status === "APPROVED") mercadopagoPaymentProviderEntity.approve()
        if(prismaMercadopago.status === "REFUNDED") mercadopagoPaymentProviderEntity.refund()
        return mercadopagoPaymentProviderEntity
    }
}

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

    async findByMercadopagoPaymentId(mercadopagoPaymentId: string): Promise<MercadopagoPaymentProviderEntity | null> {
        const prismaMercadopago = await this.prismaClient.mercadopagoPaymentProvider.findFirst({
            where: { mercadopagoPaymentId: mercadopagoPaymentId ?? ""}
        })
        if(!prismaMercadopago) return null
        return PrismaMercadopagoPaymentProvider.toDomain(prismaMercadopago)
    }

    async findById(id: string): Promise<MercadopagoPaymentProviderEntity | null> {
        const prismaMercadopago = await this.prismaClient.mercadopagoPaymentProvider.findFirst({
            where: { id: id ?? ""}
        })
        if(!prismaMercadopago) return null
        return PrismaMercadopagoPaymentProvider.toDomain(prismaMercadopago)
    }
    
    async update(mercadopagoPaymentProviderEntity: MercadopagoPaymentProviderEntity): Promise<void> {
        const { id,  } = mercadopagoPaymentProviderEntity.toJSON()
        await this.prismaClient.mercadopagoPaymentProvider.update({
            where: { id: id ?? ""},
            data: {
                status: mercadopagoPaymentProviderEntity.status
            }
        })
    }
    

}