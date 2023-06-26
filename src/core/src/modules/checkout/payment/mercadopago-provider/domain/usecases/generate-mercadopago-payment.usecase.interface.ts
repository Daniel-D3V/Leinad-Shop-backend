import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface GenerateMercadopagoPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: GenerateMercadopagoPaymentUsecaseInterface.InputDto): Promise<GenerateMercadopagoPaymentUsecaseInterface.OutputDto>
}

export namespace GenerateMercadopagoPaymentUsecaseInterface {

    export type InputDto = {
        orderId: string
        email: string
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}