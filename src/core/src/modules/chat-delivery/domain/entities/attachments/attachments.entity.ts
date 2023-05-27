import { BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class ChatDeliveryMessageAttachmentsEntity extends BaseEntity<ChatDeliveryMessageAttachmentsEntity.Props> {
    constructor(props: ChatDeliveryMessageAttachmentsEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: ChatDeliveryMessageAttachmentsEntity.Input, id?: string): Either<Error[], ChatDeliveryMessageAttachmentsEntity> {
        const chatDeliveryMessageAttachmentsEntity = new ChatDeliveryMessageAttachmentsEntity(input, id);

        return right(chatDeliveryMessageAttachmentsEntity)
    }

    toJSON(): ChatDeliveryMessageAttachmentsEntity.PropsJSON {
        return {
            id: this.id,
            attachment: this.attachment,
            type: this.type
        }
    }

    get attachment(): string {
        return this.props.attachment
    }

    get type(): ChatDeliveryMessageAttachmentsEntity.Type {
        return this.props.type
    }
}

export namespace ChatDeliveryMessageAttachmentsEntity {

    export type Type = "FILE" | "IMAGE"

    export type Input = {
        attachment: string,
        type: Type
    }

    export type Props = {
        attachment: string,
        type: Type
    }

    export type PropsJSON = Props & { id: string }
}