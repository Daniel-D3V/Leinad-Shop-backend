import mongoose from "mongoose";
import { PersistEventUsecase, RegisterEventConsumptionUsecase } from "../application/usecases";
import { PersistEventUsecaseInterface } from "../domain/usecases";
import { MongooseEventRepository } from "../infra/repositories/mongoose/mongoose-event.repository";
import { MongooseEventConsumerRepository } from "../infra/repositories/mongoose/mongoose-event-consumer-repository";
import { left } from "@/modules/@shared/logic";

const sleep = async (ms: number) => {
    return await new Promise(resolve => setTimeout(resolve, ms))
}

export class PersistEventUsecaseFactory {

    static create(): PersistEventUsecaseInterface {

        const execute = async (input: PersistEventUsecaseInterface.InputDto): Promise<PersistEventUsecaseInterface.OutputDto> => {
            const session = await mongoose.startSession()
            try{
                    session.startTransaction()
                    const mongoEventConsumerRepository = new MongooseEventConsumerRepository(session)
                    const registerEventConsumption = new RegisterEventConsumptionUsecase(mongoEventConsumerRepository)
                    const registerEventConsumptionOutput = await registerEventConsumption.execute({
                        consumerName: "event_source_consumer",
                        eventId: input.id
                    })
                    console.log("here")
                    if(registerEventConsumptionOutput.isLeft()) {
                        await session.abortTransaction()
                        return left(registerEventConsumptionOutput.value)
                    }
                    console.log("sleeping")
                    await sleep(10000)
                    console.log("awake")
                    
                    const mongoEventRepository = new MongooseEventRepository()
                    const persistEventUsecase = new PersistEventUsecase(mongoEventRepository)
                    const usecaseOutput = await persistEventUsecase.execute(input)
                    await session.commitTransaction()
                    return usecaseOutput
            
          
                }catch(err){
                    if(session.inTransaction()){
                        await session.abortTransaction();
                    }
                }finally {
                    await session.endSession();
                }


                return {} as any
      
                
        }

        return {
            execute
        }
    }
}