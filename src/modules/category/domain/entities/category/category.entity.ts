import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { CategoryValidatorFactory } from "./validator"

export class CategoryEntity extends BaseEntity<CategoryEntity.Props> {
    
    private constructor(props: CategoryEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: CategoryEntity.Input, id?: string): Either<Error[], CategoryEntity>{

        const categoryValidator = CategoryValidatorFactory.create()
        const isInputValid = categoryValidator.validate(input)
        if(isInputValid.isLeft()) return left(isInputValid.value)


        const categoryEntity = new CategoryEntity({
            ...input,
            status: "DEACTIVE"
        }, id)
        return right(categoryEntity) 
    }

    changeTitle(newTitle: string): Either<Error[] ,string> {
        const categoryValidator = CategoryValidatorFactory.create()
        const isInputValid = categoryValidator.validate({
            ...this.props
        })
        if(isInputValid.isLeft()) return left(isInputValid.value)

        this.props.title = newTitle
        return right(this.title)
    }

    changeDescription(newDescription: string): Either<Error[] ,string> {
        const categoryValidator = CategoryValidatorFactory.create()
        const isInputValid = categoryValidator.validate({
            ...this.props
        })
        if(isInputValid.isLeft()) return left(isInputValid.value)

        this.props.description = newDescription
        return right(this.description)
    }

    activate(): void{
        this.props.status = "ACTIVE"
    }
    deactivate(): void{
        this.props.status = "DEACTIVE"
    }
    
    isActivate(): boolean {
        return this.props.status === "ACTIVE"
    }
    isSubCategory(): boolean {
        return !!this.parrentId
    }
    
    toJSON(): CategoryEntity.PropsJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            parrentId: this.parrentId,
            status: this.status
        }
    }

    get title(): string {
        return this.props.title
    }
    get description(): string {
        return this.props.description
    }
    get parrentId(): string | undefined {
        return this.props.parrentId
    }
    get status(): CategoryEntity.status {
        return this.props.status
    }
}

export namespace CategoryEntity {
    
    export type status = "DEACTIVE" | "ACTIVE" 

    export type Input = {
        title: string
        description: string
        parrentId?: string
    }

    export type Props = {
        title: string
        description: string
        parrentId?: string
        status: status
    }

    export type PropsJSON = Props & { id: string }
}