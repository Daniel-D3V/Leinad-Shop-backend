import { CreateAnnounceUsecaseInterface } from "../../../domain/usecases";

export class CreateAnnounceUsecase implements CreateAnnounceUsecaseInterface {
    async execute({ userId }: CreateAnnounceUsecaseInterface.InputDto): Promise<CreateAnnounceUsecaseInterface.OutputDto> {
        throw new Error("Method not implemented.");
    }

}