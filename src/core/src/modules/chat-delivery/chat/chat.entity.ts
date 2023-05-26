import { BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class ChatDeliveryEntity extends BaseEntity<ChatDeliveryEntity.Props>{

    constructor(props: ChatDeliveryEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: ChatDeliveryEntity.Input, id?: string): Either<Error[], ChatDeliveryEntity> {
        const chatDeliveryEntity = new ChatDeliveryEntity({
            ...input,
            status: "PENDINGDELIVERY"
        }, id)

        return right(chatDeliveryEntity)
    }

    isPendingDelivery(): boolean {
        return this.status === "PENDINGDELIVERY"
    }

    isDelivered(): boolean {
        return this.status === "DELIVERED"
    }

    isFinished(): boolean {
        return this.status === "FINISHED"
    }

    deliver(): void {
        this.props.status = "DELIVERED"
    }

    finish(): void {
        this.props.status = "FINISHED"
    }

    toJSON(): ChatDeliveryEntity.PropsJSON {
        return {
            id: this.id,
            salesmanId: this.salesmanId,
            customerId: this.customerId,
            orderId: this.orderId,
            status: this.status
        }
    }

    get salesmanId(): string {
        return this.props.salesmanId
    }

    get customerId(): string {
        return this.props.customerId
    }

    get orderId(): string {
        return this.props.orderId
    }

    get status(): ChatDeliveryEntity.status {
        return this.props.status
    }
}

export namespace ChatDeliveryEntity {

    export type status = "PENDINGDELIVERY" | "DELIVERED" | "FINISHED"

    export type Input = {
        salesmanId: string,
        customerId: string,
        orderId: string
    }

    export type Props = {
        salesmanId: string,
        customerId: string,
        orderId: string,
        status: status
    }

    export type PropsJSON = Props & { id: string }
}