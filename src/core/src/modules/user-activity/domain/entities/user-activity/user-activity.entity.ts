import { BaseEntity } from "@/modules/@shared/domain";


export class UserActivityEntity extends BaseEntity<UserActivityEntity.Props> {

    private constructor(props: UserActivityEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: UserActivityEntity.Input, id?: string): UserActivityEntity {
        const userActivityEntity = new UserActivityEntity({
            ...input,
            status: "OFFLINE",
            StatusOptions: "DEFAULT"
        }, id)
        return userActivityEntity
    }

    setStatusOnline(): void {
        this.props.lastSeen = undefined
        this.props.status = "ONLINE"
    }
    setStatusOffline(): void {
        this.props.lastSeen = new Date()
        this.props.status = "OFFLINE"
    }
    isUserOnline(): boolean {
        return this.props.status === "ONLINE"
    }
    isUserOffline(): boolean {
        return this.props.status === "OFFLINE"
    }

    setOptionIdle(): void {
        this.props.StatusOptions = "IDLE"
    }
    setOptionDefault(): void {
        this.props.StatusOptions = "DEFAULT"
    }

    isOptionIdle(): boolean {
        return this.props.StatusOptions === "IDLE"
    }
    isOptionDefault(): boolean {
        return this.props.StatusOptions === "DEFAULT"
    }

    lastSeen(): Date | undefined {
        return this.props.lastSeen
    }


    toJSON(): UserActivityEntity.PropsJSON {
        return {
            id: this.id,
            userId: this.userId,
            status: this.status,
            StatusOptions: this.statusOptions,
            lastSeen: this.lastSeen(),
        }
    }

    get userId(): string {
        return this.props.userId
    } 
    get status(): UserActivityEntity.Status {
        return this.props.status
    }
    get statusOptions(): UserActivityEntity.StatusOptions {
        return this.props.StatusOptions
    }
}

export namespace UserActivityEntity {

    export type Status = "OFFLINE" | "ONLINE"
    export type StatusOptions =  "DEFAULT" | "IDLE" 

    export type Input = {
        userId: string
        lastSeen?: Date
    }

    export type Props = {
        userId: string
        status: Status
        lastSeen?: Date
        StatusOptions: StatusOptions
    }

    export type PropsJSON = Props & { id: string }
}