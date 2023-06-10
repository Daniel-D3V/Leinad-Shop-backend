export interface ConsultPriceFacadeInterface {
    consult(input: ConsultPriceFacadeInterface.InputDto): Promise<number | null>
}

export namespace ConsultPriceFacadeInterface {
    export type InputDto = {
        announceId: string      
        announceTypeId: string   
    }
}