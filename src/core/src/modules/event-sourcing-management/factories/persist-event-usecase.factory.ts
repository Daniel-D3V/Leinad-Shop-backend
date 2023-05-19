import { PersistEventUsecase } from "../application/usecases";
import { PersistEventUsecaseInterface } from "../domain/usecases";
import { MongooseEventRepository } from "../infra/repositories/mongoose/mongoose-event.repository";

export class PersistEventUsecaseFactory {

    static create(): PersistEventUsecaseInterface {

        const execute = async (input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> => {

            const mongoEventRepository = new MongooseEventRepository()
            const persistEventUsecase = new PersistEventUsecase(mongoEventRepository)
            return await persistEventUsecase.execute(input)
        }

        return {
            execute
        }
    }
}