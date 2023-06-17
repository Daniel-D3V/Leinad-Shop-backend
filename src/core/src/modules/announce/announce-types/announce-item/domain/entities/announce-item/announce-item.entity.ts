import { Either, left, right } from "@/modules/@shared/logic";
import { BaseAnnounceEntity } from "@/modules/announce/_base";
import { AnnounceItemValidatorFactory } from "./validator";

export class AnnounceItemEntity extends BaseAnnounceEntity<AnnounceItemEntity.Props> {

    private constructor(props: AnnounceItemEntity.Props, id?: string){
        super(props, id)
    }

    static validateAnnounceItemProps({ price, title }: Omit<AnnounceItemEntity.Input, "announceId">): Either<Error[], null> {	
        const errors: Error[] = []
        
        const announceItemValidatorFactory = AnnounceItemValidatorFactory.create()
        const validationTitleResult = announceItemValidatorFactory.validate({ title })
        if(validationTitleResult.isLeft()) errors.push(...validationTitleResult.value)

        const validationPriceResult = BaseAnnounceEntity.validateProps({ price })
        if(validationPriceResult.isLeft()) errors.push(...validationPriceResult.value)

        if(errors.length > 0) return left(errors)
        return right(null)
    }

    static create(input: AnnounceItemEntity.Input, id?: string): Either<Error[], AnnounceItemEntity> {
        
        const validationResult = AnnounceItemEntity.validateAnnounceItemProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const announceNormalEntity = new AnnounceItemEntity({
            ...input
        }, id)
        return right(announceNormalEntity)
    }

    changeTitle(title: string): Either<Error[], null> {
        const validationResult = AnnounceItemEntity.validateAnnounceItemProps({ title, price: this.getPrice() })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        this.props.title = title
        return right(null)
    }

    toJSON(): AnnounceItemEntity.PropsJSON {
        return {
            id: this.id,
            price: this.getPrice(),
            announceId: this.announceId,
            title: this.title
        }
    }

    get announceId(): string {
        return this.props.announceId
    }
    get title(): string {
        return this.props.title
    }
}

export namespace AnnounceItemEntity {

    export type Input = { 
        price: number
        title: string
        announceId: string
    }
    export type Props = BaseAnnounceEntity.Props & {
        title: string
        announceId: string
    }
    export type PropsJSON = Props & { id: string }
}