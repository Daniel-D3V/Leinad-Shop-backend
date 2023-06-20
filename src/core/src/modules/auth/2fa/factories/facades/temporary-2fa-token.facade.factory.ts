import { Temporary2faTokenFacadeImp } from "../../infra/facades";
import { Temporary2faTokenFacadeInterface } from "../../facades";
import { RedisCacheProvider } from "@/modules/@shared/infra/providers";



export class Temporary2faTokenFacadeFactory {
    
    static create(): Temporary2faTokenFacadeInterface {

        const redisCacheProvider = new RedisCacheProvider()
        const temporary2faTokenFacadeImp = new Temporary2faTokenFacadeImp(
            redisCacheProvider
        )
        return temporary2faTokenFacadeImp;
    }
}