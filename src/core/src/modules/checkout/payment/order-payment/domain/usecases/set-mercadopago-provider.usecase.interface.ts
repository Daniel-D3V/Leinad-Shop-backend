import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface SetMercadopagoProviderUsecaseInterface extends UsecaseInterface {
    execute(input: SetMercadopagoProviderUsecaseInterface.InputDto): Promise<SetMercadopagoProviderUsecaseInterface.OutputDto>
}

export namespace SetMercadopagoProviderUsecaseInterface {

    export type InputDto = {
        orderPaymentId: string
        mercadopagoProviderId: string
    }

    export type OutputDto = Either<Error[], null>
}