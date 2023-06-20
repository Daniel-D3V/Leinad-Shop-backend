


export interface Temporary2faTokenFacadeInterface {
    generate(input: Temporary2faTokenFacadeInterface.GenerateInputDto): Promise<Temporary2faTokenFacadeInterface.GenerateOutputDto>
    find(temporaryToken: string): Promise<Temporary2faTokenFacadeInterface.FindOutputDto>
}

export namespace Temporary2faTokenFacadeInterface {
    
    export type Temporary2faToken = {
        temporary2faToken: string
    }
    export type Temporary2faTokenResult = {
        userId: string
    }

    export type GenerateInputDto = Temporary2faTokenResult
    export type GenerateOutputDto = Temporary2faToken

    export type FindOutputDto = Temporary2faTokenResult | null
}