import { left, right } from "@/modules/@shared/logic";
import { GenerateMercadoPagoPaymentUsecaseInterface } from "../../../domain/usecases";
import { MercadopagoPaymentProviderEntity } from "../../../domain/entities";



export class GenerateMercadopagoPaymentUsecase implements GenerateMercadoPagoPaymentUsecaseInterface {

    async execute({ orderId }: GenerateMercadoPagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadoPagoPaymentUsecaseInterface.OutputDto> {
        
        const mercadopagoPaymentProvider = MercadopagoPaymentProviderEntity.create({
            amount: 1,
            mercadopagoPaymentId: "",
            orderPaymentId: ""
        })
        if(mercadopagoPaymentProvider.isLeft()) return left(mercadopagoPaymentProvider.value)

        return right({
            id: mercadopagoPaymentProvider.value.id
        })
    }
}