import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CancelMercadopagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: CancelMercadopagoPaymentUsecaseInterface.InputDto): Promise<CancelMercadopagoPaymentUsecaseInterface.OutputDto>
}

export namespace CancelMercadopagoPaymentUsecaseInterface {

    export type InputDto = {
        mercadopagoPaymentProviderId: string
    }

    export type OutputDto = Either<Error[], null>
}