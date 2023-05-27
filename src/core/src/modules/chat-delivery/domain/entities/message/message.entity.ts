import { BaseEntity } from "@/modules/@shared/domain";
import { MessageValidatorFactory } from "./validator";
import { Either, left, right } from "@/modules/@shared/logic";
import { ChatDeliveryMessageAttachmentsEntity } from "../attachments/attachments.entity";

export class ChatDeliveryMessageEntity extends BaseEntity<ChatDeliveryMessageEntity.Props> {
    private constructor(props: ChatDeliveryMessageEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: ChatDeliveryMessageEntity.Input, id?: string): Either<Error[], ChatDeliveryMessageEntity> {
        const messageValidator = MessageValidatorFactory.create()
        const isInputValid = messageValidator.validate(input)
        if (isInputValid.isLeft()) return left(isInputValid.value)
        const messageEntity = new ChatDeliveryMessageEntity({
            ...input,
            dateTimeSent: input.dateTimeSent ?? new Date()
        }, id)

        return right(messageEntity)
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

    get attachments(): ChatDeliveryMessageAttachmentsEntity[] | undefined {
        return this.props.attachments
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
        attachments?: ChatDeliveryMessageAttachmentsEntity[],
        dateTimeSent?: Date
    }

    export type Props = {
        authorId: string,
        chatId: string,
        content?: string,
        attachments?: ChatDeliveryMessageAttachmentsEntity[],
        dateTimeSent: Date
    }

    export type PropsJSON = Props & { id: string }
}