import { BaseEntity } from "@/modules/@shared/domain";


export class NotificationEntity extends BaseEntity<NotificationEntity.Props> {

    private constructor(props: NotificationEntity.Props, id?: string){
        super(props, id)
    }

    static create(input:  NotificationEntity.Input, id?: string): NotificationEntity {
        return new NotificationEntity({
            ...input,
            hasBeenSeen: false,
            dateTimeSent: input.dateTimeSent || new Date()
        }, id)
    }

    view(): void {
        this.props.hasBeenSeen = true
    }

    hasBeenSeen(): boolean {
        return this.props.hasBeenSeen
    }

    toJSON(): NotificationEntity.PropsJSON {
        return {
            id: this.id,
            content: this.content,
            topic: this.topic,
            hasBeenSeen: this.hasBeenSeen(),
            userId: this.userId,
            dateTimeSent: this.dateTimeSent
        }
    }

    get content(): string {
        return this.props.content
    }
    get topic(): string {
        return this.props.topic
    }
    get userId(): string {
        return this.props.userId
    }
    get dateTimeSent(): Date {
        return this.props.dateTimeSent
    }
}

export namespace NotificationEntity {
    
    export type Input = {
        content: string
        topic: string
        userId: string
        dateTimeSent?: Date
    }
    export type Props = {
        content: string
        topic: string
        hasBeenSeen: boolean
        userId: string
        dateTimeSent: Date
    }

    export type PropsJSON = Props & { id: string }
}