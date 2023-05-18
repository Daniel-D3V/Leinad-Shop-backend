import { EventEmitterInterface } from "@/modules/@shared/events"
import { CategoryRepositoryInterface } from "../../domain/repositories"
import {  PrismaCategoryRepository } from "../repositories"
import { prismaClient } from "@/modules/@shared/infra/repository/prisma/client"
import { PrismaClient } from "@prisma/client"
import { PrismaOutBox } from "./outbox"
import { UsecaseInterface } from "@/modules/@shared/domain"
import { Either } from "@/modules/@shared/logic"


describe("batata", () => {

    // let persistCategoryUsecase: PersistCategoryUsecase
    // let prismaCategoryRepository: CategoryRepositoryInterface
    // let outbox: EventEmitterInterface

    // beforeEach( async () => {
    //     await prismaClient.outbox.deleteMany({})
    //     await prismaClient.category.deleteMany({})
    // })

    it("", async () => {


        // class PersistCategoryUsecaseFactory {
        //     static create(): PersistCategoryUsecase{
        //         return this.makeUsecase()
        //     }
            
        //     static makeUsecase(): PersistCategoryUsecase{
        //         class Usecase implements UsecaseInterface{
        //             async execute(input: any): Promise<Either<Error[], any>> {
        //                 const output = await prismaClient.$transaction(async (prisma) => {
        //                     const  prismaCategoryRepository = new  PrismaCategoryRepository(prisma as PrismaClient)
        //                     const outbox = new PrismaOutBox(prisma as PrismaClient)
        //                     // jest.spyOn(outbox, "emit")
        //                     // .mockRejectedValue(new Error("any_error"))
        //                     const persistCategoryUsecase = new PersistCategoryUsecase(prismaCategoryRepository, outbox)
        //                     const output = await persistCategoryUsecase.execute(input)
        //                     return output
        //                 })
        //                 return output
        //             }
        //         }
        //         return new Usecase() as PersistCategoryUsecase
        //     }

        // }

        // const persistCategoryUsecase = PersistCategoryUsecaseFactory.create()

        // await persistCategoryUsecase.execute({
        //     description: "any_description",
        //     title: "any_title",
        // })
        

    })
    
    // it("", async () => {

    

    //     // try{

    //     //     await prismaClient.$transaction(async (prisma) => {

    //     //         prismaCategoryRepository = new PrismaCategoryRepository(prisma as PrismaClient)
    //     //         outbox = new PrismaOutBox(prisma as PrismaClient)
    //     //         jest.spyOn(outbox, "emit")
    //     //         .mockRejectedValue(new Error())
    //     //         persistCategoryUsecase = new PersistCategoryUsecase(prismaCategoryRepository, outbox)
                
    //     //         await persistCategoryUsecase.execute({
    //     //             description: "any_description",
    //     //             title: "any_title"
    //     //         })
    //     //     })
            
    //     // }catch(err){
    //     //     console.log(err)
    //     // }



    // })
})