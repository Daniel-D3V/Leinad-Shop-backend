import { BaseEntity } from "@/modules/@shared/domain"

export class AnnounceImageEntity extends BaseEntity<AnnounceImageEntity.Props> {

    private constructor(props: AnnounceImageEntity.Props, id?: string){
        super(props, id)
    }

    toJSON(): AnnounceImageEntity.PropsJSON {
        return {
            id: this.id,
            images: this.images
        }
    }

    get images(): AnnounceImageEntity.Image[] {
        return this.props.images
    }
}

export namespace AnnounceImageEntity {
    export type Image = {
        weight: string
        url: string
    }
    export type Input = {
        images: Image[]
    }
    export type Props = {
        images: Image[]
    }
    export type PropsJSON = Props & { id: string }
}
