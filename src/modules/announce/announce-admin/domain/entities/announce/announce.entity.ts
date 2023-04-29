import { BaseEntity } from "@/modules/@shared/domain";

export class AnnounceEntity extends BaseEntity<AnnounceEntity.Props> {

    private constructor(props: AnnounceEntity.Props, id?: string) {
        super(props, id);
    }

    

    toJSON(): AnnounceEntity.PropsJSON {
        return {
            id: this.id
        }
    }

}


export namespace AnnounceEntity {
    export type Input = {}
    export type Props = {}
    export type PropsJSON = Props & { id: string }
} 