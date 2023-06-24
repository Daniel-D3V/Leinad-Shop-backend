import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { PlaceOrderUsecaseInterface } from "./place-order-usecase.interface";
import { OrderItemEntity } from "../entities";

export interface CreateOrderItemFromPropsUsecaseInterface extends UsecaseInterface {
    execute(input: CreateOrderItemFromPropsUsecaseInterface.InputDto): Promise<CreateOrderItemFromPropsUsecaseInterface.OutputDto>
}

export namespace CreateOrderItemFromPropsUsecaseInterface {


    export type InputDto = PlaceOrderUsecaseInterface.InputDto["products"]

    export type OutputDto = Either<Error[], OrderItemEntity[]>
}