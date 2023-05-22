import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories";
import { AnnounceDeletedEvent } from "./announce-deleted.event";
import { DeleteAnnounceUsecaseInterface } from "../../../domain/usecases";

export class DeleteAnnounceUsecase implements DeleteAnnounceUsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: DeleteAnnounceUsecaseInterface.InputDto): Promise<DeleteAnnounceUsecaseInterface.OutputDto> {


        await this.announceRepository.delete(announceId)

        const announceDeletedEvent = new AnnounceDeletedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceDeletedEvent)

        return right(null)
    }
}