import { CheckCategoryActiveFacadeFactory, CheckCategoryActiveFacadeInteface } from "@/modules/category/facades";
import { CreateAnnounceUsecase } from "./create-announce.usecase";
import { CreateAnnounceInputDto } from "./create-announce.dto";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";

jest.mock("@/modules/category/facades")
jest.mock("@/modules/announce/announce-admin/domain/entities")

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
        announceEntity = mock<AnnounceEntity>({ toJSON: () => "announceEntityToJsonValue" as any })
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
})