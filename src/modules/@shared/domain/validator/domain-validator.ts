import { Either } from "../../logic";

export interface DomainValidator<Props> {
    validate(props: Props): Either<Error[], null>
}