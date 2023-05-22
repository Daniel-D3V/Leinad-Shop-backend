import { mock } from "jest-mock-extended"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { CheckAnnounceFromUserUsecaseInterface } from "../../../domain/usecases"
import { CheckAnnounceFromUserUsecase } from "./check-announce-from-user.usecase"
import { AnnounceEntity } from "../../../domain/entities"


describe('Test CheckAnnounceFromUser', () => { 

    let sut: CheckAnnounceFromUserUsecase
    let props: CheckAnnounceFromUserUsecaseInterface.InputDto
    let announceRepository: AnnounceRepositoryInterface
    let announceEntity: AnnounceEntity


    beforeEach(() => {
        
        props = {
            announceId: 'announceId',
            userId: 'any_user_id'
        }
        announceRepository = mock<AnnounceRepositoryInterface>()
        announceEntity = mock<AnnounceEntity>({
            userId: "any_user_id"
        })
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        sut = new CheckAnnounceFromUserUsecase(announceRepository)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return AnnounceNotFoundError if announce is not found", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNotFoundError")
    })

    it("Should return AnnounceNotFromUserError if announce is not from user", async () => {
        props.userId = "another_user_id"
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("AnnounceNotFromUserError")
    })
    
})