import mongoose from "mongoose";
import { PersistEventUsecase } from "../application/usecases";
import { PersistEventUsecaseInterface } from "../domain/usecases";
import { MongooseEventRepository } from "../infra/repositories/mongoose/mongoose-event.repository";

export class PersistEventUsecaseFactory {

    static create(): PersistEventUsecaseInterface {

        const execute = async (input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> => {
            const session = await mongoose.startSession()
            try{
                session.startTransaction();
                const mongoEventRepository = new MongooseEventRepository()
                const persistEventUsecase = new PersistEventUsecase(mongoEventRepository)
                const usecaseOutput = await persistEventUsecase.execute(input)
                await session.commitTransaction()
                session.endSession();
                return usecaseOutput
            }catch(err){
                await session.abortTransaction();
                session.endSession();
                throw err
            }

        }

        return {
            execute
        }
    }
}