import { BaseEntity } from "@/modules/@shared/domain"
import { Either, right } from "@/modules/@shared/logic"

class CategoryEntity extends BaseEntity<CategoryEntity.Props> {
    
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

describe("test CategoryEntity", () => {

    it("Should create a CategoryEntity", () => {
        const props = {
            title: "any_title",
            description: "any_description",
            parrentId: "any_parrent_id"
        }
        const sut = CategoryEntity.create(props, "any_id")
    
        if(sut.isLeft()) throw sut.value[0]
    
        expect(sut.value.toJSON()).toEqual({
            id: "any_id",
            title: props.title,
            description: props.description,
            parrentId: props.parrentId
        })
    })

})