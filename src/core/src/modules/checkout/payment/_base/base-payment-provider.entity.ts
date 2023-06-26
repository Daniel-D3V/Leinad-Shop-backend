import { BaseEntity } from "@/modules/@shared/domain";



export abstract class BasePaymentProviderEntity extends BaseEntity<BasePaymentProviderEntity.Props> {

    constructor(props: BasePaymentProviderEntity.Props, id?: string){
        super(props, id);
    }

    abstract toJSON(): Record<string, unknown>;
    
}

export namespace BasePaymentProviderEntity {

    export type Status =  "PENDING" | "CANCELLED" | "REFUNDED" |  "APPROVED" 
    export type PaymentMethods = "PIX" 

    export type Props = {
        orderPaymentId: string
        mercadopagoPaymentId: string
    }
}