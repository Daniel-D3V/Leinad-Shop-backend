import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { DescriptionNotProvidedError, InvalidDescriptionLengthError, InvalidDescriptionTypeError, InvalidPriceLengthError, InvalidPriceTypeError, InvalidTitleLengthError, InvalidTitleTypeError, PriceNotProvidedError, TitleNotProvidedError } from "../errors";

export class YupAnnounceValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceValidator.ValidateFields>{

    schema = yup.object({

        title: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
            .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
            .max(255, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),

        description: yup.string()
            .strict(true)
            .typeError(YupErrorAdapter.toYupFormat(new InvalidDescriptionTypeError()))
            .required(YupErrorAdapter.toYupFormat(new DescriptionNotProvidedError()))
            .min(5, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError()))
            .max(500, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError())),

        price: yup.number()
        .strict(true)
        .typeError(YupErrorAdapter.toYupFormat(new InvalidPriceTypeError()))
        .required(YupErrorAdapter.toYupFormat(new PriceNotProvidedError()))
        .min(0.10, YupErrorAdapter.toYupFormat(new InvalidPriceLengthError()))
        .max(100000000, YupErrorAdapter.toYupFormat(new InvalidPriceLengthError())),
        
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
