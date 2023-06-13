import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceNotFoundError } from "@/modules/announce/announce-images/application/usecases/_errors";
import { ConsultAnnounceTypeFacadeInterface } from "@/modules/announce/announce-management/facades";
import { AllocateAnnounceItemUsecase } from "../announce-item-allocation/allocate-announce-item.usecase";

export class AllocateStockUsecase implements UsecaseInterface {

    constructor(
        private readonly consultAnnounceTypeFacade: ConsultAnnounceTypeFacadeInterface,
        private readonly allocateAnnounceItemUsecase: AllocateAnnounceItemUsecase
    ){}

    async execute(input: AllocateStockUsecase.InputDto): Promise<Either<Error[], any>> {
        
        const announceType = await this.consultAnnounceTypeFacade.consult({
            announceId: input.announceId,
        })
        if(!announceType) return left([ new AnnounceNotFoundError() ])

        switch(announceType) {
            case "ITEM":
                await this.allocateAnnounceItemUsecase.execute({})
                break
            case "NORMAL":

                break
        }

        return right(null)
    }
}

export namespace AllocateStockUsecase {

    export type InputDto = {
        announceId: string
        announceTypeId: string
    }
}