import { BaseEntity } from "@/modules/@shared/domain";


export class UserActivityEntity extends BaseEntity<UserActivityEntity.Props> {

    private constructor(props: UserActivityEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: UserActivityEntity.Input, id?: string): UserActivityEntity {
        const userActivityEntity = new UserActivityEntity({

        }, id)
        return userActivityEntity
    }


    toJSON(): UserActivityEntity.PropsJSON {
        return {
            id: this.id,
        }
    }
}

export namespace UserActivityEntity {

    export type Status = "OFFLINE" | "ONLINE"

    export type Input = {}

    export type Props = {}

    export type PropsJSON = Props & { id: string }
}