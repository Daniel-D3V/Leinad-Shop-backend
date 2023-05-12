import { CheckAnnounceExistsFacadeInterface, GetAnnouncePriceFacadeInterface } from "@/modules/announce/announce-admin/facades";
import { PlaceOrderInputDto } from "../../place-order.dto"
import { CreateOrderItemsFromDtoUsecase } from "./create-order-items-from-dto.usecase"

import { CheckAnnounceExistsFacadeFactory, GetAnnouncePriceFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { GetProductStockFacadeFactory } from "@/modules/product-stock/factories";
import { GetProductStockFacadeInterface } from "@/modules/product-stock/facades";

jest.mock("@/modules/announce/announce-admin/factories")
jest.mock("@/modules/product-stock/factories")

describe("Test CreateOrderItemsFromDtoUsecase", () => {

    let sut: CreateOrderItemsFromDtoUsecase
    let props: PlaceOrderInputDto["products"]
    let checkAnnounceExistsFacade: CheckAnnounceExistsFacadeInterface
    let getProductStockFacade: GetProductStockFacadeInterface
    let getAnnouncePriceFacade: GetAnnouncePriceFacadeInterface

    beforeEach(() => {
        getProductStockFacade = { execute: jest.fn().mockResolvedValue(3) }
        GetProductStockFacadeFactory.create = jest.fn().mockReturnValue(getProductStockFacade)

        checkAnnounceExistsFacade = { execute: jest.fn().mockResolvedValue(true) }
        CheckAnnounceExistsFacadeFactory.create = jest.fn().mockReturnValue(checkAnnounceExistsFacade)

        getAnnouncePriceFacade = { execute: jest.fn().mockResolvedValue(10) }
        GetAnnouncePriceFacadeFactory.create = jest.fn().mockReturnValue(getAnnouncePriceFacade)
        
        props = [
            { id: "1", quantity: 3 },
            { id: "2", quantity: 2 },
            { id: "3", quantity: 1 }
        ]
        sut = new CreateOrderItemsFromDtoUsecase()
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })



})