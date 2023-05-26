import { YupMessageValidator } from "./yup-message.validator"

describe('Test YubMessageValidator', () => {
    let yupMessageValidator: YupMessageValidator
    let props: YupMessageValidator.ValidateFields

    beforeAll(() => {
        yupMessageValidator = new YupMessageValidator()
    })

    beforeEach(() => {
        props = {
            content: "any_content",
            attachments: ["any_attachment"]
        }
    })

    describe("Test content field", () => {
        it("should return InvalidContentTypeError if an invalid content type is provided ", () => {
            const output = yupMessageValidator.validate({
                ...props,
                content: 123 as any
            })

            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidContentTypeError")
        })

        it("should return InvalidContentLengthError if a invalid content length is provided", () => {
            const output = yupMessageValidator.validate({
                ...props,
                content: "A".repeat(5001)
            })

            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidContentLengthError")
        })
    })

    describe("Test attachments field", () => {
        it("should return InvalidAttachmentsTypeError if an invalid attachments type is provided ", () => {
            const output = yupMessageValidator.validate({
                ...props,
                attachments: 123 as any
            })

            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidAttachmentsTypeError")
        })

        it("should return InvalidAttachmentsMaxLengthError if a invalid attachments length is provided ", () => {
            const output = yupMessageValidator.validate({
                ...props,
                attachments: "any,".repeat(6).split(",")
            })

            if (output.isRight()) throw new Error()
            expect(output.value[0].name).toBe("InvalidAttachmentsMaxLengthError")
        })
    })

    it("Shuld return NoAttachmentOrContentProvidedError if no attachment and no content are provided", () => {
        props = {}

        const output = yupMessageValidator.validate(props);

        expect(output.value![0].name).toBe("NoAttachmentOrContentProvidedError")
    })

    it("Should return right if correct params are provided", () => {
        const output = yupMessageValidator.validate(props);

        expect(output.isRight()).toBeTruthy()
    })
})