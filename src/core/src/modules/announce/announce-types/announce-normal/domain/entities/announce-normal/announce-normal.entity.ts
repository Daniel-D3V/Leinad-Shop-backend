import { Either, left, right } from "@/modules/@shared/logic";
import { BaseAnnounceEntity } from "@/modules/announce/_base";

export class AnnounceNormalEntity extends BaseAnnounceEntity<AnnounceNormalEntity.Props> {

    private constructor(props: AnnounceNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create({ price }: AnnounceNormalEntity.Input, id?: string): Either<Error[], AnnounceNormalEntity> {
        
        const validationResult = AnnounceNormalEntity.validateProps({ price })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const announceNormalEntity = new AnnounceNormalEntity({
            price
        }, id)
        return right(announceNormalEntity)
    }

    toJSON(): AnnounceNormalEntity.PropsJSON {
        return {
            id: this.id,
            price: this.getPrice()
        }
    }

}

export namespace AnnounceNormalEntity {

    export type Input = { 
        price: number
    }
    export type Props = BaseAnnounceEntity.Props 
    export type PropsJSON = Props & { id: string }
}