import { CacheRedisProvider } from "./cache-redis.provider"


describe("Test CacheRedisProvider", () => {

    let sut: CacheRedisProvider
    let prefix: string
    let key: string
    let value: any

    beforeEach(() => {
        value = {
            any_value: "any_value"
        }
        prefix = "any_prefix"
        key = "any_key"
        sut = new CacheRedisProvider()
        sut.client.flushall()
    })

    it("Should set a value", async () => {
        await sut.set({
            prefix,
            key,
            value,
            expirationInSeconds: 10
        })

        const result = await sut.get(prefix, key)
        expect(result).toEqual(value)
    })

    it("Should return null if value not exists", async () => {
        const result = await sut.get(prefix, key)
        expect(result).toBeNull()
    })

    it("Should delete a value", async () => {
        await sut.set({
            prefix,
            key,
            value,
            expirationInSeconds: 10
        })

        await sut.delete(prefix, key)
        const result = await sut.get(prefix, key)
        expect(result).toBeNull()
    })

    
})