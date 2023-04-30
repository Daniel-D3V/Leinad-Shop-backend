import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';

export class YupAnnounceImageValidator extends YupValidatorProvider implements DomainValidator<YupAnnounceImageValidator.ValidateFields>{

    schema = yup.object({

        // title: yup.string()
        //     .strict(true)
        //     .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
        //     .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
        //     .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
        //     .max(80, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),
            
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
