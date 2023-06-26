import { DomainValidator, YupErrorAdapter, YupValidatorProvider } from "@/modules/@shared/domain/validator";
import { Either, left, right } from "@/modules/@shared/logic";
import * as yup from 'yup';

export class YupPaymentValidator extends YupValidatorProvider implements DomainValidator<YupPaymentValidator.ValidateFields>{

    schema = yup.object({

        // title: yup.string()
        //     .strict(true)
        //     .typeError(YupErrorAdapter.toYupFormat(new InvalidTitleTypeError()))
        //     .required(YupErrorAdapter.toYupFormat(new TitleNotProvidedError()))
        //     .min(5, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError()))
        //     .max(255, YupErrorAdapter.toYupFormat(new InvalidTitleLengthError())),
        
        // description: yup.string()
        //     .strict(true)
        //     .typeError(YupErrorAdapter.toYupFormat(new InvalidDescriptionTypeError()))
        //     .required(YupErrorAdapter.toYupFormat(new DescriptionNotProvidedError()))
        //     .min(5, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError()))
        //     .max(255, YupErrorAdapter.toYupFormat(new InvalidDescriptionLengthError()))
    });

    validate(props: YupPaymentValidator.ValidateFields): Either<Error[], null> {
        const schemaValid = this.validateSchema(props)
        if(schemaValid.isLeft()) return left(schemaValid.value)
        return right(null)
    }
}

export namespace YupPaymentValidator {
    export type ValidateFields = {
        paymentMethod: string
    }
    
}
