import { BaseEntity } from "@/modules/@shared/domain"
import { Either, right } from "@/modules/@shared/logic"


export class AnnounceManagementEntity extends BaseEntity<AnnounceManagementEntity.Props> {

    private constructor(props: AnnounceManagementEntity.Props, id?: string) {
        super(props, id)
    }

    static create({  }: AnnounceManagementEntity.Input, id?: string): Either<Error[], AnnounceManagementEntity> {

        const announceManagementEntity = new AnnounceManagementEntity({
            status: "DEACTIVATED",
            announceType: "NORMAL",
        }, id)
        return right(announceManagementEntity)
    }

    toJSON(): AnnounceManagementEntity.PropsJSON {
        return {
            id: this.id,
            status: this.status,
            announceType: this.announceType,
        }
    }
    
    get status(): AnnounceManagementEntity.Status {
        return this.props.status
    }
    get announceType(): AnnounceManagementEntity.AnnounceType {
        return this.props.announceType
    }
    
}

export namespace AnnounceManagementEntity {

    export type Status = "DEACTIVATED" | "ACTIVATED" | "BANNED"
    export type AnnounceType = "NORMAL" | "ITEM"
    

    export type Input = {}

    export type Props = {
        status: Status
        announceType: AnnounceType
    }
    
    export type PropsJSON = Props & { id: string }
}