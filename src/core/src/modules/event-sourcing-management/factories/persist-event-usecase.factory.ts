import mongoose from "mongoose";
import { PersistEventUsecase, RegisterEventConsumptionUsecase } from "../application/usecases";
import { PersistEventUsecaseInterface } from "../domain/usecases";
import { MongooseEventRepository } from "../infra/repositories/mongoose/mongoose-event.repository";
import { MongooseEventConsumerRepository } from "../infra/repositories/mongoose/mongoose-event-consumer-repository";
import { left } from "@/modules/@shared/logic";

export class PersistEventUsecaseFactory {

    static create(): PersistEventUsecaseInterface {

        const execute = async (input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> => {
            const session = await mongoose.startSession()
            session.startTransaction();
            try{
                const mongoEventConsumerRepository = new MongooseEventConsumerRepository()
                const registerEventConsumption = new RegisterEventConsumptionUsecase(mongoEventConsumerRepository)
                const registerEventConsumptionOutput = await registerEventConsumption.execute({
                    consumerName: "event_source_consumer",
                    eventId: input.id
                })
                if(registerEventConsumptionOutput.isLeft()) return left(registerEventConsumptionOutput.value)

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