import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { GeneratePaymentInputDto } from "./generate-payment.dto";
import { CustomerEntity, PaymentEntity } from "../../../domain/entities";
import { CustomerRepositoryInterface } from "../../../domain/repositories";
import { CustomerNotFoundError } from "./errors";

export interface PaymentMethodGateway {
    generatePayment(): Promise<any>
}

export class GeneratePaymentUsecase implements UsecaseInterface {

    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
        private readonly paymentMethodGateway: PaymentMethodGateway
    ){}

    async execute({ customerId, orderId, paymentMethod }: GeneratePaymentInputDto): Promise<Either<Error[], any>> {

        const customerEntity = await this.customerRepository.findById(customerId)
        if(!customerEntity) return left([new CustomerNotFoundError()])

        const paymentEntity = PaymentEntity.create({
            orderId,
            paymentMethod,
            customer: customerEntity
        })
        if(paymentEntity.isLeft()) return left(paymentEntity.value)



        return right(null)
    }
}