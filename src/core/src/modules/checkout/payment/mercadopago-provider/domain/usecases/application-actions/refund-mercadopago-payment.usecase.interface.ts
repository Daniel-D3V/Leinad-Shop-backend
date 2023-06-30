import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface RefundMercadopagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: RefundMercadopagoPaymentUsecaseInterface.InputDto): Promise<RefundMercadopagoPaymentUsecaseInterface.OutputDto>
}

export namespace RefundMercadopagoPaymentUsecaseInterface {

    export type InputDto = {
        mercadopagoPaymentId: string
    }

    export type OutputDto = Either<Error[], null>
}