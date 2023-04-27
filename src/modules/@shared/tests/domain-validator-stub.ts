import { Either, left, right } from "@/modules/@shared/logic"
import { DomainValidator } from "@/modules/@shared/domain/validator"

export class DomainValidatorStub implements DomainValidator<any> {
    validate(props: any): Either<Error[], null> {
        return right(null)
    }
 
}
