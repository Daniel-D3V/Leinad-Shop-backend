import { AddStockItemAutoUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases"
import { AddStockItemAutoUsecase } from "./add-stock-item-auto.usecase"
import { StockItemAutoRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { StockItemAutoEntity } from "@/modules/stock/_base"
import { mock } from "jest-mock-extended"
import { StockItemAutoAddedEvent } from "./stock-item-auto-added.event"

jest.mock('./stock-item-auto-added.event')

describe('Test AddStockItemAutoUsecase', () => { 

    let sut: AddStockItemAutoUsecase
    let props: AddStockItemAutoUsecaseInterface.InputDto
    let stockItemAutoRepository: StockItemAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let stockItemAutoEntity: StockItemAutoEntity


    beforeEach(() => {

        props = {
            stockItemId: 'any_stock_item_id',
            value: 'any_value'
        }
        stockItemAutoEntity = mock<StockItemAutoEntity>()
        jest.spyOn(StockItemAutoEntity, 'create').mockReturnValue({
            isLeft: () => false,
            value: stockItemAutoEntity
        } as any)
        stockItemAutoRepository = mock<StockItemAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new AddStockItemAutoUsecase(stockItemAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {    
        const result = await sut.execute(props)
        expect(result.isRight()).toBeTruthy()
    })

    it("Should return left if StockItemAutoEntity.create returns left", async () => {
        const entityCreationError = [new Error('any_error')]
        jest.spyOn(StockItemAutoEntity, 'create').mockReturnValue({
            isLeft: () => true,
            value: entityCreationError
        } as any)
        const result = await sut.execute(props)
        if(result.isRight()) return fail('Should not return right')
        expect(result.value).toEqual(entityCreationError)
    })

    it("Should call StockItemAutoRepository.create with the right params", async () => {
        await sut.execute(props)
        expect(stockItemAutoRepository.create).toHaveBeenCalledWith(stockItemAutoEntity)
        expect(stockItemAutoRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call EventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create a StockItemAutoAddedEvent with the right params", async () => {
        await sut.execute(props)
        expect(StockItemAutoAddedEvent).toHaveBeenCalledWith({
            ...stockItemAutoEntity.toJSON()
        })
    })
})