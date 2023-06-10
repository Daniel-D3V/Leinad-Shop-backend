
export interface ConsultStockFacadeInterface {
    consult(input: ConsultStockFacadeInterface.InputDto): Promise<number | null>
}

export namespace ConsultStockFacadeInterface {
    export type InputDto = {
        announceId: string
        announceTypeId: string
    }
}