import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ProcessPaymentInputDto } from "./process-payment.dto";
import { PaymentRepositoryInterface } from "../../../domain/repositories";
import { PaymentNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { PaymentProcessedEvent } from "./payment-processed.event";


export class ProcessPaymentUsecase implements UsecaseInterface {
    
    constructor(
        private readonly paymentRepository: PaymentRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ paymentId }: ProcessPaymentInputDto): Promise<Either<Error[], any>> {

        const paymentEntity = await this.paymentRepository.findById(paymentId)
        if(!paymentEntity) return left([ new PaymentNotFoundError() ])

        paymentEntity.pay()
        await this.paymentRepository.update(paymentEntity)

        const paymentProcessedEvent = new PaymentProcessedEvent({
            paymentId: paymentEntity.id,
            status: paymentEntity.status
        })
        await this.eventEmitter.emit(paymentProcessedEvent)

        return right(null)
    }
}