import { AnnounceImageEntity } from "./announce-image.entity"


describe("Test AnnounceImageEntity", () => {

    let sut: AnnounceImageEntity
    let id: string
    let props: AnnounceImageEntity.Input

    beforeEach(() => {
        id = "any_id"
        props = {
            images: [
                { weight: 1, url: "any_url_1" },
                { weight: 2, url: "any_url_2" },
                { weight: 3, url: "any_url_3" },
                { weight: 4, url: "any_url_4" }
            ]
        }
        const sutCreated = AnnounceImageEntity.create(props, id)
        if(sutCreated.isLeft()) throw sutCreated.value[0]
        sut = sutCreated.value
    })

    it("Should create a AnnounceImageEntity", () => {

    })
})