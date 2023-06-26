import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ApprovePaymentInputDto } from "./approve-payment.dto";
import { PaymentRepositoryInterface } from "../../../domain/repositories";
import { PaymentNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { PaymentApprovedEvent } from "./payment-approved.event"

export class ApprovePaymentUsecase implements UsecaseInterface {
    
    constructor(
        private readonly paymentRepository: PaymentRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ paymentId }: ApprovePaymentInputDto): Promise<Either<Error[], any>> {

        const paymentEntity = await this.paymentRepository.findById(paymentId)
        if(!paymentEntity) return left([ new PaymentNotFoundError() ])

        paymentEntity.approve()
        await this.paymentRepository.update(paymentEntity)

        const paymentApprovedEvent = new PaymentApprovedEvent({
            paymentId: paymentEntity.id,
            status: paymentEntity.status
        })
        await this.eventEmitter.emit(paymentApprovedEvent)

        return right(null)
    }
}


// Escrevi fui trabalhar, quem ta lendo quer me dar um emprego? 