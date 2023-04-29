import { CheckCategoryActiveFacadeFactory, CheckCategoryActiveFacadeInteface } from "@/modules/category/facades";
import { CreateAnnounceUsecase } from "./create-announce.usecase";
import { CreateAnnounceInputDto } from "./create-announce.dto";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";
import { CreateAnnounceCommand } from "./create-announce.command";

jest.mock("@/modules/category/facades")
jest.mock("@/modules/announce/announce-admin/domain/entities")
jest.mock("./create-announce.command")

describe("test CreateAnnounceUsecase", () => {

    let sut: CreateAnnounceUsecase
    let props: CreateAnnounceInputDto
    let commandEmitter: CommandEmitterInterface
    let announceEntity: AnnounceEntity
    let checkCategoryActiveFacade: CheckCategoryActiveFacadeInteface

    beforeEach(() => {
        checkCategoryActiveFacade = mock<CheckCategoryActiveFacadeInteface>({ checkByCategoryId: async () => true })
        jest.spyOn(CheckCategoryActiveFacadeFactory, "create").mockReturnValue(checkCategoryActiveFacade)
        commandEmitter = mock<CommandEmitterInterface>()
        announceEntity = mock<AnnounceEntity>({ toJSON: () => ({ value: "announceEntityToJsonValue"}) as any })
        jest.spyOn(AnnounceEntity, "create").mockReturnValue({ 
            isLeft: () => false,
            value: announceEntity
        } as any)

        props = {
            title: "any_title",
            description: "any_description",
            price: 10,
            userId: "any_user_id",
            categoryId: "any_category_id",
        }
        sut = new CreateAnnounceUsecase(commandEmitter)
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
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should return CategoryNotActiveError ", async () => {
        jest.spyOn(checkCategoryActiveFacade, "checkByCategoryId").mockResolvedValue(false)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("CategoryNotActiveError")
    })

    it("Should call commandEmitter once ", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create CreateAnnounceCommand with correct values ", async () => {
        await sut.execute(props)
        expect(CreateAnnounceCommand).toHaveBeenCalledWith({ value: "announceEntityToJsonValue"})
    })
})