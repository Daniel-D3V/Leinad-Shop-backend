import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { BaseStockItemEntity } from "@/modules/stock/_base";
import { AnnounceItemValidatorFactory } from "./validator";

export class AnnounceItemEntity extends BaseEntity<AnnounceItemEntity.Props> {

    private constructor(props: AnnounceItemEntity.Props, id?: string){
        super(props, id)
    }

    static validateProps(props: BaseStockItemEntity.Props): Either<Error[], null>{
        const validator = AnnounceItemValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }
    

    static create(input: AnnounceItemEntity.Input, id?: string): Either<Error[], AnnounceItemEntity> {

        const validationResult = AnnounceItemEntity.validateProps({ ...input })
        if(validationResult.isLeft()) return left(validationResult.value)

        const announceItemEntity = new AnnounceItemEntity({
            ...input
        }, id)
        return right(announceItemEntity)
    }

    toJSON(): AnnounceItemEntity.PropsJSON {
        return {
            id: this.id,
            price: this.price,
            title: this.title,
            announceId: this.announceId
        }
    }


    changePrice(price: number): Either<Error[], number> {
        const validationResult = AnnounceItemEntity.validateProps({ 
            ...this.props, 
            price 
        })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.price = price
        return right(price)
    }

    changeTitle(newTitle: string): Either<Error[], string> {
        const validationResult = AnnounceItemEntity.validateProps({ 
            ...this.props, 
            title: newTitle
        })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.title = newTitle
        return right(newTitle)
    }

    get announceId(): string {
        return this.props.announceId
    }
    get price(): number {
        return this.props.price
    }
    get title(): string {
        return this.props.title
    }


}

export namespace AnnounceItemEntity {


    export type Input = {
        announceId: string
        title: string
        price: number
    }

    export type Props = {
        announceId: string
        title: string
        price: number
    }
    export type PropsJSON = Props & { id: string }
}