import { Either, right } from "@/modules/@shared/logic"
import { DomainValidator } from "@/modules/@shared/domain/validator"
import { mock } from 'jest-mock-extended';


export const mockDomainValidator = (): jest.Mocked<DomainValidator<any>> => {
    const domainValidatorMock = mock<DomainValidator<any>>();
    domainValidatorMock.validate.mockReturnValue(right(null));
    return domainValidatorMock;
}

