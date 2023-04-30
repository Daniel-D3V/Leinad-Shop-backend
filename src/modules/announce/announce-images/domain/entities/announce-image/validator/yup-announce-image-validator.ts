import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';
import { ImagesNotProvidedError, InvalidWeightTypeError, InvalidImagesLengthError, WeightNotProvidedError, InvalidWeightSizeError, InvalidUrlTypeError, UrlNotProvidedError, InvalidUrlLengthError } from "../errors";

export class YupAnnounceImageValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceImageValidator.ValidateFields>{

    schema = yup.object({
        
        images: yup.array().of(
            yup.object().shape({
              weight: yup.number()
                .strict(true)
                .typeError(YupErrorAdapter.toYupFormat(new InvalidWeightTypeError()))
                .required(YupErrorAdapter.toYupFormat(new WeightNotProvidedError()))
                .min(0, YupErrorAdapter.toYupFormat(new InvalidWeightSizeError()))
                .max(1000000, YupErrorAdapter.toYupFormat(new InvalidWeightSizeError())),
              url: yup.string()
                .strict(true)
                .typeError(YupErrorAdapter.toYupFormat(new InvalidUrlTypeError()))
                .required(YupErrorAdapter.toYupFormat(new UrlNotProvidedError()))
                .max(255, YupErrorAdapter.toYupFormat(new InvalidUrlLengthError(255))),
            })
        )
        .required(YupErrorAdapter.toYupFormat(new ImagesNotProvidedError()))
        .max(7, YupErrorAdapter.toYupFormat(new InvalidImagesLengthError(7)))
    });

    validate(props: YupAnnounceImageValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupAnnounceImageValidator {

    export type ValidateFields = {

        images: {
            weight: number
            url: string
        }[]
    }
    
}
