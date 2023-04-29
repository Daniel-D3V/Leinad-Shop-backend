import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";

export class AnnounceEntity extends BaseEntity<AnnounceEntity.Props> {

    private constructor(props: AnnounceEntity.Props, id?: string) {
        super(props, id);
    }

    static create(input: AnnounceEntity.Input, id?: string): Either<Error[], AnnounceEntity>{

        const announceEntity = new AnnounceEntity({
            ...input
        }, id)

        return right(announceEntity)
    }

    toJSON(): AnnounceEntity.PropsJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price
        }
    }

    get title(): string {
        return this.props.title;
    }
    get description(): string {
        return this.props.description;
    }
    get price(): number {
        return this.props.price;
    }
}


export namespace AnnounceEntity {
    export type Input = {
        title: string
        description: string
        price: number
    }
    export type Props = {
        title: string
        description: string
        price: number
    }
    export type PropsJSON = Props & { id: string }
} 