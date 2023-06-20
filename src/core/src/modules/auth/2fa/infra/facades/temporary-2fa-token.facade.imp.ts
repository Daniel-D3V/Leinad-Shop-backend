import { CacheProviderInterface } from "@/modules/@shared/application";
import { Temporary2faTokenFacadeInterface } from "../../facades";
import { randomBytes } from "crypto"

export class Temporary2faTokenFacadeImp implements Temporary2faTokenFacadeInterface {
    
    private readonly prefix = "Temporary2faToken"

    constructor(
        private readonly cacheProvider: CacheProviderInterface
    ){}

    async generate(input: Temporary2faTokenFacadeInterface.Temporary2faTokenResult): Promise<Temporary2faTokenFacadeInterface.Temporary2faToken> {
        
        const temporary2faToken = randomBytes(32).toString('hex');
        await this.cacheProvider.set({
            prefix: this.prefix,
            key: temporary2faToken,
            value: input,
            expirationInSeconds: 60 * 3 // 3 minutes
        })
        return {
            temporary2faToken
        }
    }
    
    async find(temporaryToken: string): Promise<Temporary2faTokenFacadeInterface.FindOutputDto> {
        return await this.cacheProvider.get<Temporary2faTokenFacadeInterface.Temporary2faTokenResult>(
            this.prefix,
            temporaryToken
        )
    }

    async delete(temporaryToken: string): Promise<void> {
        await this.cacheProvider.delete(
            this.prefix,
            temporaryToken
        )
    }

}