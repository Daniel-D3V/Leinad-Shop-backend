import { BaseEntity } from "@/modules/@shared/domain";
import { AnnounceInfoValidatorFactory } from "./validator";
import { Either, left, right } from "@/modules/@shared/logic";

export class AnnounceInfoEntity extends BaseEntity<AnnounceInfoEntity.Props> {

    private constructor(props: AnnounceInfoEntity.Props, id?: string) {
        super(props, id)
    }
    
    static validateProps(props: AnnounceInfoEntity.Input): Either<Error[], null>{
        const validator = AnnounceInfoValidatorFactory.create()
        const validationResult = validator.validate({ ...props })
        if(validationResult.isLeft()) return left(validationResult.value)
        return right(null)
    }

    static create(input: AnnounceInfoEntity.Input, id?: string): Either<Error[], AnnounceInfoEntity> {
        const validationResult = AnnounceInfoEntity.validateProps({
            ...input
        })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const announceInfoEntity = new AnnounceInfoEntity({
            ...input
        }, id)
        return right(announceInfoEntity)
    }

    changeTitle(newTitle: string): Either<Error[] ,string>{
        const isInputValid = AnnounceInfoEntity.validateProps({ 
            ...this.props, title: newTitle
        })
        if(isInputValid.isLeft()) return left(isInputValid.value)
        this.props.title = newTitle
        return right(this.title)
    }

    changeDescription(newDescription: string): Either<Error[] ,string>{
        const isInputValid = AnnounceInfoEntity.validateProps({ 
            ...this.props, description: newDescription
        })
        if(isInputValid.isLeft()) return left(isInputValid.value)
        this.props.description = newDescription
        return right(this.description)
    }


    toJSON(): AnnounceInfoEntity.PropsJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            announceId: this.announceId
        }
    }

    get title(): string {
        return this.props.title
    }

    get description(): string {
        return this.props.description
    }

    get announceId(): string {
        return this.props.announceId
    }
}

export namespace AnnounceInfoEntity {
    
    export type Input = {
        title: string
        description: string
        announceId: string
    }

    export type Props = {
        title: string
        description: string
        announceId: string
    }

    export type PropsJSON = Props & { id: string } 
}