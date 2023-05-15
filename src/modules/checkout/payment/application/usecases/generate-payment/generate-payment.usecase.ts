import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { GeneratePaymentInputDto } from "./generate-payment.dto";
import { CustomerEntity, PaymentEntity } from "../../../domain/entities";
import { CustomerRepositoryInterface, PaymentRepositoryInterface } from "../../../domain/repositories";
import { CustomerNotFoundError } from "./errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { PaymentGeneratedEvent } from "./payment-generated.event";

export interface PaymentMethodGateway {
    generatePayment(): Promise<Either<Error[], any>>
}

export class GeneratePaymentUsecase implements UsecaseInterface {

    constructor(
        private readonly paymentRepository: PaymentRepositoryInterface,
        private readonly customerRepository: CustomerRepositoryInterface,
        private readonly paymentMethodGateway: PaymentMethodGateway,
        private readonly eventEmitter: EventEmitterInterface
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

        const paymentMethodGatewayResponse = await this.paymentMethodGateway.generatePayment()
        if(paymentMethodGatewayResponse.isLeft()) return left(paymentMethodGatewayResponse.value)

        await this.paymentRepository.create(paymentEntity.value)

        const paymentGeneratedEvent = new PaymentGeneratedEvent({
            ...paymentEntity.value.toJSON()
        })
        await this.eventEmitter.emit(paymentGeneratedEvent)

        return right(paymentMethodGatewayResponse.value)
    }
}