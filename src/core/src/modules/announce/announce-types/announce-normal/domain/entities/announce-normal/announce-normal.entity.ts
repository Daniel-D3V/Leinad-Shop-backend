import { Either, left, right } from "@/modules/@shared/logic";
import { BaseAnnounceEntity } from "@/modules/announce/_base";

export class AnnounceNormalEntity extends BaseAnnounceEntity<AnnounceNormalEntity.Props> {

    private constructor(props: AnnounceNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create({ price, announceId }: AnnounceNormalEntity.Input, id?: string): Either<Error[], AnnounceNormalEntity> {
        
        const validationResult = AnnounceNormalEntity.validateProps({ price })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const announceNormalEntity = new AnnounceNormalEntity({
            price,
            announceId
        }, id)
        return right(announceNormalEntity)
    }

    toJSON(): AnnounceNormalEntity.PropsJSON {
        return {
            id: this.id,
            price: this.getPrice(),
            announceId: this.announceId
        }
    }

    get announceId(): string {
        return this.props.announceId
    }

}

export namespace AnnounceNormalEntity {

    export type Input = { 
        price: number
        announceId: string
    }
    export type Props = BaseAnnounceEntity.Props & {
        announceId: string
    }
    export type PropsJSON = Props & { id: string }
}