import { CheckCategoryActiveFacadeFactory, CheckCategoryActiveFacadeInteface } from "@/modules/category/facades";
import { CreateAnnounceUsecase } from "./create-announce.usecase";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { AnnounceCreatedEvent } from "./announce-created.event";
import { CreateAnnounceUsecaseInterface } from "../../../domain/usecases";

jest.mock("@/modules/category/facades")
jest.mock("@/modules/announce/announce-admin/domain/entities")
jest.mock("./announce-created.event")

describe("test CreateAnnounceUsecase", () => {

    let sut: CreateAnnounceUsecase
    let props: CreateAnnounceUsecaseInterface.InputDto
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity
    let announceRepository: AnnounceRepositoryInterface
    let checkCategoryActiveFacade: CheckCategoryActiveFacadeInteface


    beforeEach(() => {
        checkCategoryActiveFacade = mock<CheckCategoryActiveFacadeInteface>({ checkByCategoryId: async () => true })
        jest.spyOn(CheckCategoryActiveFacadeFactory, "create").mockReturnValue(checkCategoryActiveFacade)
        eventEmitter = mock<EventEmitterInterface>()
        announceEntity = mock<AnnounceEntity>({ toJSON: () => ({ value: "announceEntityToJsonValue"}) as any })
        jest.spyOn(AnnounceEntity, "create").mockReturnValue({ 
            isLeft: () => false,
            value: announceEntity
        } as any)

        announceRepository = mock<AnnounceRepositoryInterface>()
        props = {
            title: "any_title",
            description: "any_description",
            price: 10,
            userId: "any_user_id",
            categoryId: "any_category_id",
        }
        sut = new CreateAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if announceEntity returns left", async () => {
        const entityError =  new Error("EntityError")
        jest.spyOn(AnnounceEntity, "create").mockReturnValueOnce({ 
            isLeft: () => true,
            value: [ entityError ]
        } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should return CategoryNotActiveError ", async () => {
        jest.spyOn(checkCategoryActiveFacade, "checkByCategoryId").mockResolvedValue(false)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.value![0].name).toBe("CategoryNotActiveError")
    })

    it("Should call announceRepository.create once", async () => {
        await sut.execute(props)
        expect(announceRepository.create).toHaveBeenCalledTimes(1)
    })


    it("Should call eventEmitter once ", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceCreatedEvent with correct values ", async () => {
        await sut.execute(props)
        expect(AnnounceCreatedEvent).toHaveBeenCalledWith({ value: "announceEntityToJsonValue"})
    })
})