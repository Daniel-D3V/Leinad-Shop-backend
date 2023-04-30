import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceImageValidatorFactory } from "./validator"

export class AnnounceImageEntity extends BaseEntity<AnnounceImageEntity.Props> {

    private constructor(props: AnnounceImageEntity.Props, id: string){
        super(props, id)
    }

    static formatImages(images: AnnounceImageEntity.Image[]){
        images.sort((a, b) => a.weight - b.weight);
        images.forEach((value, index) => {
            value.weight = index + 1
        })
    } 

    static create(input: AnnounceImageEntity.Input, id: string): Either<Error[], AnnounceImageEntity>{

        const announceImageValidator = AnnounceImageValidatorFactory.create()
        const isPropsValid = announceImageValidator.validate({
            images: input.images
        })
        if(isPropsValid.isLeft()) return left(isPropsValid.value)

        this.formatImages(input.images)

        const announceImageEntity = new AnnounceImageEntity({
            ...input
        }, id)
        return right(announceImageEntity)
    }

    changeImages(newImages: AnnounceImageEntity.Image[]): Either<Error[], AnnounceImageEntity.Image[]>{
        const announceImageValidator = AnnounceImageValidatorFactory.create()
        const isImagesValid = announceImageValidator.validate({
            images: newImages
        })
        if(isImagesValid.isLeft()) return left(isImagesValid.value)
        this.props.images = newImages
        return right(this.images)
    }

    getFirstImage(): AnnounceImageEntity.Image | null {
        return this.images[0] ?? null
    }

    getImagesLength(): number {
        return this.images.length
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
        weight: number
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
