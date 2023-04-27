import { BaseEntity } from "@/modules/@shared/domain"
import { Either, right } from "@/modules/@shared/logic"

export class CategoryEntity extends BaseEntity<CategoryEntity.Props> {
    
    private constructor(props: CategoryEntity.Props, id?: string) {
        super(props, id)
    }

    static create(input: CategoryEntity.Input, id?: string): Either<Error[], CategoryEntity>{

        const categoryEntity = new CategoryEntity(input, id)
        return right(categoryEntity) 
    }
    
    toJSON(): CategoryEntity.PropsJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            parrentId: this.parrentId
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
}

export namespace CategoryEntity {
    
    export type Input = {
        title: string
        description: string
        parrentId?: string
    }

    export type Props = {
        title: string
        description: string
        parrentId?: string
    }

    export type PropsJSON = Props & { id: string }
}