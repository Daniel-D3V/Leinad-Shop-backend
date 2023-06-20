export interface CacheProviderInterface {
    get<Output = any>(prefix: string, key: string): Promise<Output | null>;
    set(input: CacheProviderInterface.SetInput): Promise<void>;
    delete(prefix: string, key: string): Promise<void>;
}

export namespace CacheProviderInterface {
    export type SetInput = {
        prefix: string,
        key: string,
        value: any,
        expirationInSeconds: number
    }
}
