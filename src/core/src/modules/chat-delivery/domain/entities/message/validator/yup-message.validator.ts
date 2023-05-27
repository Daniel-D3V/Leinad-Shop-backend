import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidContentLengthError, InvalidContentTypeError } from "./errors";
import { InvalidAttachmentsMaxLengthError, InvalidAttachmentsTypeError } from "./errors/attachments/errors";
import { NoAttachmentOrContentProvidedError } from "./errors/custom";
import { ChatDeliveryMessageAttachmentsEntity } from "../../attachments/attachments.entity";

export class YupMessageValidator extends YupValidatorProvider implements DomainValidator<YupMessageValidator.ValidateFields>{

    schema = yup.object({
        content: yup.string()
            .optional()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidContentTypeError()))
            .max(1000, YupErrorAdapter.toYupFormat(new InvalidContentLengthError())),

        attachments: yup.array()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidAttachmentsTypeError()))
            .optional()
            .max(5, YupErrorAdapter.toYupFormat(new InvalidAttachmentsMaxLengthError()))
            .test("Test Entity instance", YupErrorAdapter.toYupFormat(new InvalidAttachmentsTypeError()), (attachments: any) => {
                for (const attachment of attachments ?? []) {
                    if (!(attachment instanceof ChatDeliveryMessageAttachmentsEntity)) return false;
                }

                return true;
            })
    })

    validate(props: YupMessageValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if (schemaValid.isLeft()) return left(schemaValid.value)
        if (!props?.content && !props?.attachments?.length) return left([new NoAttachmentOrContentProvidedError()])
        return right(null)
    }
}

export namespace YupMessageValidator {
    export type ValidateFields = {
        content?: string
        attachments?: ChatDeliveryMessageAttachmentsEntity[]
    }
}