import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

    export interface RedirectMercadopagoActionsUsecaseInterface extends UsecaseInterface {
    execute(input: RedirectMercadopagoActionsUsecaseInterface.InputDto): Promise<RedirectMercadopagoActionsUsecaseInterface.OutputDto>
}

export namespace RedirectMercadopagoActionsUsecaseInterface {

    export type Actions = "payment.created" | "payment.updated"

    export type InputDto = {
        action: Actions
        mercadoPagoPaymentId: string
    }

    export type OutputDto = Either<Error[], null>
}