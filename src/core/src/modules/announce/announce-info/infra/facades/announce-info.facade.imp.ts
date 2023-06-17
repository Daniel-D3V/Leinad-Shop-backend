import { AnnounceInfoRepositoryInterface } from "../../domain/repositories";
import { announceInfoFacadeInterface } from "../../facades";


export class AnnounceInfoFacadeImp implements announceInfoFacadeInterface {

    constructor(
        private readonly announceInfoRepository: AnnounceInfoRepositoryInterface
    ){}

    async checkExistsByAnnounceId(announceId: string): Promise<boolean> {
        const announceInfo = await this.announceInfoRepository.findByAnnounceId(announceId)
        return !!announceInfo
    }
}