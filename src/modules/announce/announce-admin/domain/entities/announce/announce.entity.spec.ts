import { left } from "@/modules/@shared/logic"
import { AnnounceEntity } from "./announce.entity"


describe("Test announce entity", () => {

    let props: AnnounceEntity.Input
    let sut: AnnounceEntity

    const makeSut = (props: AnnounceEntity.Props, id?: string): AnnounceEntity => {
        const sut = AnnounceEntity.create(props, id)
        if(sut.isLeft()) throw sut.value[0]
        return sut.value
    }

    beforeEach(() => {
        props = {
            title: "any_title",
            description: "any_description",
            price: 10
        }
        sut = makeSut(props)
    })

    it("Should Create an announce entity", () => {
        const sut = makeSut(props, "any_id")
        expect(sut.toJSON()).toEqual({
            id: "any_id",
            title: "any_title",
            description: "any_description",
            price: 10
        })
    })
})