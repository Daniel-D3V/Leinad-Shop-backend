import { BaseEntity } from "@/modules/@shared/domain";

export class ChatDeliveryMessageEntity extends BaseEntity<ChatDeliveryMessageEntity.Props> {
    private constructor(props: ChatDeliveryMessageEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: ChatDeliveryMessageEntity.Input, id?: string) {

    }

    toJSON(): ChatDeliveryMessageEntity.PropsJSON {
        return {
            id: this.id,
            authorId: this.authorId,
            chatId: this.chatId,
            content: this.content,
            attachments: this.attachments,
            dateTimeSent: this.dataTimeSent
        }
    }

    get authorId(): string {
        return this.props.authorId
    }

    get chatId(): string {
        return this.props.chatId
    }

    get content(): string | undefined {
        return this.props.content
    }

    get attachments(): string[] {
        return this.attachments
    }

    get dataTimeSent(): Date {
        return this.props.dateTimeSent
    }
}

export namespace ChatDeliveryMessageEntity {
    export type Input = {
        authorId: string,
        chatId: string,
        content?: string,
        attachments?: string[],
        dateTimeSent?: Date
    }

    export type Props = {
        authorId: string,
        chatId: string,
        content?: string,
        attachments?: string[],
        dateTimeSent: Date
    }

    export type PropsJSON = Props & { id: string }
}