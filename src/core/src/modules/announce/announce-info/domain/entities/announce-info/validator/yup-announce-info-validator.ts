import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { DescriptionNotProvidedError, InvalidDescriptionLengthError, InvalidTitleLengthError, TitleNotProvidedError } from "../errors";
import { InvalidTitleTypeError } from "../errors/title/Invalid-title-type.error";
import { InvalidDescriptionTypeError } from "../errors/description/Invalid-description-type.error";

export class YupAnnounceInfoValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceInfoValidator.ValidateFields>{

    schema = yup.object({

        title: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
            .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
            .max(80, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),

        description: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidDescriptionTypeError()))
            .required(YupErrorAdapter.toYupFormat(new DescriptionNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError()))
            .max(500, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError())),
            
    });

    validate(props: YupAnnounceInfoValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupAnnounceInfoValidator {
    export type ValidateFields = {
        title: string
        description: string
    }
    
}
