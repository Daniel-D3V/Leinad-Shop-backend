import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface ApproveMercadopagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: ApproveMercadopagoPaymentUsecaseInterface.InputDto): Promise<ApproveMercadopagoPaymentUsecaseInterface.OutputDto>
}

export namespace ApproveMercadopagoPaymentUsecaseInterface {

    export type InputDto = {
        mercadopagoPaymentId: string
    }

    export type OutputDto = Either<Error[], null>
}