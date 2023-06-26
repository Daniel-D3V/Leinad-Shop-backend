import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface GenerateMercadoPagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: GenerateMercadoPagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadoPagoPaymentUsecaseInterface.OutputDto>
}

export namespace GenerateMercadoPagoPaymentUsecaseInterface {

    export type InputDto = {
        orderId: string
        email: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}