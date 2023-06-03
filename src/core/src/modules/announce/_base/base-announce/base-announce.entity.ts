import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { BaseAnnounceValidatorFactory } from "./validator";


export abstract class BaseAnnounceEntity<T> extends BaseEntity<BaseAnnounceEntity.Props & T> {

    constructor(props: BaseAnnounceEntity.Props & T, id?: string) {
        super(props, id);
    }

    static validateProps(props: BaseAnnounceEntity.Props): Either<Error[], null>{
        const validator = BaseAnnounceValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }


    changePrice(newPrice: number): Either<Error[], number> {
        const validationResult = BaseAnnounceEntity.validateProps({ price: newPrice })
        if(validationResult.isLeft()) return left(validationResult.value)
        this.props.price = newPrice
        return right(this.props.price)
    }

    getPrice(): number {
        return this.props.price;
    }

    abstract toJSON(): Record<string, unknown>

}

export namespace BaseAnnounceEntity {

    export type Props = {
        price: number
    }
}