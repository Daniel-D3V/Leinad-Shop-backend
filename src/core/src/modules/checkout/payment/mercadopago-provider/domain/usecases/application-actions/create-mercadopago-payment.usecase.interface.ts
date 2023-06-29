import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateMercadopagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: CreateMercadopagoPaymentUsecaseInterface.InputDto): Promise<CreateMercadopagoPaymentUsecaseInterface.OutputDto>
}

export namespace CreateMercadopagoPaymentUsecaseInterface {

    export type InputDto = {
        mercadopagoPaymentId: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}