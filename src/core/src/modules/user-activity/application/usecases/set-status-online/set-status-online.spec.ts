import { SetStatusOnlineUsecaseInterface } from "@/modules/user-activity/domain/usecases"
import { SetStatusOnlineUsecase } from "./set-status-online.usecase"
import { UserActivityRepositoryInterface } from "@/modules/user-activity/domain/repositories"
import { UserActivityEntity } from "@/modules/user-activity/domain/entities"
import { mock } from "jest-mock-extended"


describe("Test SetStatusOnlineUsecase", () => {

    let sut: SetStatusOnlineUsecase
    let props: SetStatusOnlineUsecaseInterface.InputDto
    let userActivityRepository: UserActivityRepositoryInterface
    let userActivityEntity: UserActivityEntity

    beforeEach(() => {
        props = {
            userId: "any_user_id"
        }
        userActivityEntity = mock<UserActivityEntity>()
        userActivityRepository = mock<UserActivityRepositoryInterface>({
            findByUserId: jest.fn().mockResolvedValue(userActivityEntity),
        })
        sut = new SetStatusOnlineUsecase(userActivityRepository)
    })
    
    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return UserActivityNotFoundError if user activity not found", async () => {
        jest.spyOn(userActivityRepository, "findByUserId").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not return right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("UserActivityNotFoundError")
    })

    it("Should call setStatusOnline method", async () => {
        await sut.execute(props)
        expect(userActivityEntity.setStatusOnline).toBeCalledTimes(1)
    })

    it("Should call update method", async () => {
        await sut.execute(props)
        expect(userActivityRepository.update).toBeCalledTimes(1)
    })

})