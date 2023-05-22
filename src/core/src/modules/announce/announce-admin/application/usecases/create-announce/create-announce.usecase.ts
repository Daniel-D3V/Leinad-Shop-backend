import { CheckCategoryActiveFacadeFactory } from "@/modules/category/facades";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { CategoryNotActiveError } from "../_errors";
import { AnnounceCreatedEvent } from "./announce-created.event";
import { CreateAnnounceUsecaseInterface } from "../../../domain/usecases";



export class CreateAnnounceUsecase implements CreateAnnounceUsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto> {

        const announceEntity = AnnounceEntity.create({
            ...input
        })
        if(announceEntity.isLeft()) return left(announceEntity.value)

        const checkCategoryActiveFacade = CheckCategoryActiveFacadeFactory.create()
        const isCategoryActive = await checkCategoryActiveFacade.checkByCategoryId(input.categoryId)
        if(!isCategoryActive) return left([new CategoryNotActiveError()])

        await this.announceRepository.create(announceEntity.value)

        const announceCreatedEvent = new AnnounceCreatedEvent({
            ...announceEntity.value.toJSON()
        })
        await this.eventEmitter.emit(announceCreatedEvent)
        return right({
            id: announceEntity.value.id
        })
    }
}