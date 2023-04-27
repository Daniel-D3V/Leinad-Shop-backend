import { CategoryEntity } from "./category.entity"


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