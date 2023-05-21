import mongoose from "mongoose";
import { PersistEventUsecase, RegisterEventConsumptionUsecase } from "../application/usecases";
import { PersistEventUsecaseInterface } from "../domain/usecases";
import { MongooseEventRepository } from "../infra/repositories/mongoose/mongoose-event.repository";
import { MongooseEventConsumerRepository } from "../infra/repositories/mongoose/mongoose-event-consumer-repository";
import { left, right } from "@/modules/@shared/logic";

const sleep = async (ms: number) => {
    return await new Promise(resolve => setTimeout(resolve, ms))
}

export class PersistEventUsecaseFactory {

    static create(): PersistEventUsecaseInterface {

        const execute = async (input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> => {
            const session = await mongoose.startSession()
            let result: PersistEventUsecaseInterface.OutputDto
            try{
                    session.startTransaction()
                    const mongoEventConsumerRepository = new MongooseEventConsumerRepository(session)
                    const registerEventConsumption = new RegisterEventConsumptionUsecase(mongoEventConsumerRepository)
                    const registerEventConsumptionOutput = await registerEventConsumption.execute({
                        consumerName: "event_source_consumer",
                        eventId: input.id
                    })
                    if(registerEventConsumptionOutput.isLeft()) {
                        await session.abortTransaction()
                        return left(registerEventConsumptionOutput.value)
                    }

                    const mongoEventRepository = new MongooseEventRepository(session)
                    const persistEventUsecase = new PersistEventUsecase(mongoEventRepository)
                    await persistEventUsecase.execute(input)
                    await session.commitTransaction()
                    result = right(null)
                }catch(err){
                    await session.abortTransaction();
                    result = left([ err as Error ])
                }finally {
                    await session.endSession();
                }

                return result
        }

        return {
            execute
        }
    }
}