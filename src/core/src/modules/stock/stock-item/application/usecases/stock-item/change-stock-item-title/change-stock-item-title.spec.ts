// import {  ChangeStockItemTitleUsecaseInterface } from "@/modules/stock/stock-item/domain/usecases";
// import { StockItemRepositoryInterface } from "@/modules/stock/stock-item/domain/repositories";
// import { StockItemEntity } from "@/modules/stock/stock-item/domain/entities";
// import { EventEmitterInterface } from "@/modules/@shared/events";
// import { mock } from "jest-mock-extended";
// import { ChangeStockItemTitleUsecase } from "./change-stock-item-title.usecase";
// import { StockItemTitleChangedEvent } from "./stock-item-title-changed.event";

// jest.mock("./stock-item-title-changed.event")

// describe("Test ChangeStockItemPrice", () => { 

//     let sut: ChangeStockItemTitleUsecase;
//     let props: ChangeStockItemTitleUsecaseInterface.InputDto
//     let stockItemRepository: StockItemRepositoryInterface
//     let eventEmitter: EventEmitterInterface
//     let stockItemEntity: StockItemEntity

//     beforeEach(() => {

//         props = {
//             title: "any_title",
//             stockItemId: "any_stock_item_id"
//         }
//         stockItemEntity = mock<StockItemEntity>({
//             id: props.stockItemId,
//             title: props.title,
//             changeTitle: () => ({
//                 isLeft: () => false,
//             }) as any
//         } )
//         stockItemRepository = mock<StockItemRepositoryInterface>({
//             findById: async () => stockItemEntity
//         })

//         eventEmitter = mock<EventEmitterInterface>()

//         sut = new ChangeStockItemTitleUsecase(stockItemRepository, eventEmitter)
//     })

//     it("Should execute the usecase properly", async () => {
//         const output = await sut.execute(props)
//         expect(output.isRight()).toBeTruthy()
//     })

//     it("Should return StockItemNotFoundError if stock item not found", async () => {
//         jest.spyOn(stockItemRepository, "findById").mockResolvedValueOnce(null)
//         const output = await sut.execute(props)
//         if(output.isRight()) return fail("Should not return right")
//         expect(output.isLeft()).toBeTruthy()
//         expect(output.value[0].name).toBe("StockItemNotFoundError")
//     })

//     it("Should return error if stock item changeTitle fails", async () => {
//         const error = new Error("any_error")
//         jest.spyOn(stockItemEntity, "changeTitle").mockReturnValueOnce({
//             isLeft: () => true,
//             value: [ error ]
//         } as any)

//         const output = await sut.execute(props)
//         if(output.isRight()) return fail("Should not return right")
//         expect(output.isLeft()).toBeTruthy()
//         expect(output.value[0]).toBe(error)
//     })

//     it("Should call stockItemRepository update method once" , async () => {
//         await sut.execute(props)
//         expect(stockItemRepository.update).toBeCalledWith(stockItemEntity)
//         expect(stockItemRepository.update).toBeCalledTimes(1)
//     })

//     it("Should call eventEmitter emit method once", async () => {
//         await sut.execute(props)
//         expect(eventEmitter.emit).toBeCalledTimes(1)
//     })

//     it("Should create StockItemTitleChangedEvent with correct values", async () => { 
//         await sut.execute(props)
//         expect(StockItemTitleChangedEvent).toBeCalledWith({
//             ...props
//         })
//     })
// })
it("", () => {})