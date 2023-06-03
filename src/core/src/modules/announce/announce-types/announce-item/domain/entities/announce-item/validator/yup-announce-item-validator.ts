import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import {  InvalidTitleLengthError, InvalidTitleTypeError, TitleNotProvidedError } from "../errors";

export class YupAnnounceItemValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceItemValidator.ValidateFields>{

    schema = yup.object({

        title: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
            .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
            .max(150, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
    }); 

    validate(props: YupAnnounceItemValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupAnnounceItemValidator {
    export type ValidateFields = {
        title: string
    }
    
}