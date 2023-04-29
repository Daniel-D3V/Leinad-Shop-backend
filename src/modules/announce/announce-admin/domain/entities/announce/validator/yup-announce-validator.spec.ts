import { YupAnnounceValidator } from "./yup-announce-validator"


describe("Test yupAnnounceValidator", () => {

    let props: YupAnnounceValidator.ValidateFields
    let sut: YupAnnounceValidator

    beforeEach(() => {
        props = {
            title: "any_title",
            description: "any_description",
            price: 10
        }
        sut = new YupAnnounceValidator()
    })

    describe("Test title field", () => {
        
        it("Should  return InvalidTitleTypeError if an invalid title type is provided", () => {
            props.title = { } as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidTitleTypeError")
        })
    })

    describe("Test description field", () => {
        
        it("Should  return InvalidDescriptionTypeError if an invalid description type is provided", () => {
            props.description = { } as string
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidDescriptionTypeError")
        })
    })
})