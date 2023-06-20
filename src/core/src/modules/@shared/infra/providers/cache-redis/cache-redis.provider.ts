import { CacheProviderInterface } from "@/modules/@shared/application";
import Redis from "ioredis";

export class RedisCacheProvider implements CacheProviderInterface {

    client: Redis

    constructor(){
        this.client = this.connect()
    }

    connect(): Redis {
        const connection = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        });
        return connection;
    }
    
    disconnect(): void {
        this.client.disconnect();
    }
    

    async get<Output = any>(prefix: string, key: string): Promise<Output | null> {
        const value = await this.client.get(`${prefix}:${key}`)
        if(!value) return null
        return JSON.parse(value) as Output
    }

    async set(input: CacheProviderInterface.SetInput): Promise<void> {
        await this.client.set(
            `${input.prefix}:${input.key}`,
            JSON.stringify(input.value),
            "EX",
            input.expirationInSeconds,
        )
    }
    async delete(prefix: string, key: string): Promise<void> {
        await this.client.del(`${prefix}:${key}`)
    }


    
}