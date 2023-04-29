import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { InvalidDescriptionTypeError, InvalidTitleTypeError } from "../errors";

export class YupAnnounceValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceValidator.ValidateFields>{

    schema = yup.object({

        title: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError())),

        description: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidDescriptionTypeError()))
        //     .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
        //     .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
        //     .max(255, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),
        

    });

    validate(props: YupAnnounceValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupAnnounceValidator {
    export type ValidateFields = {
        title: string
        description: string
        price: number
    }
    
}
