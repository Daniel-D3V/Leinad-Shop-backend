

type AllocateAnnounceNormalInput = {
    announceNormalId: string
    quantity: number
}

interface AllocateAnnounceNormal {
    execute(input: AllocateAnnounceNormalInput): Promise<void>
}

interface ConsultAnnounceNormalStockTypeInterface {
    consult(announceNormalId: string): Promise<"Manual" | "AUTO">
}

interface AllocateAnnnounceNormalEntity  {
    id: string
    announceNormalId: string
}

interface AllocateAnnounceNormalRepository {
    create(allocateAnnounceNormalEntity: AllocateAnnnounceNormalEntity): Promise<void>
}

class AllocateAnnounceNormalImpl implements AllocateAnnounceNormal {

    constructor(
        private readonly consultAnnounceNormalStockType: ConsultAnnounceNormalStockTypeInterface,
        private readonly allocateAnnounceNormalRepository: AllocateAnnounceNormalRepository
    ){}

    async execute({ announceNormalId, quantity }: AllocateAnnounceNormalInput): Promise<void> {
        const announceNormalStockType = await this.consultAnnounceNormalStockType.consult(announceNormalId)
        
        for(let i = 0; i < quantity; i++){
            switch(announceNormalStockType){
                case "AUTO":
                    await this.allocateAnnounceNormalRepository.create({
                        id: "any_id",
                        announceNormalId
                    })
                    break
                case "Manual":
                    await this.allocateAnnounceNormalRepository.create({
                        id: "any_id",
                        announceNormalId
                    })
                    break
            }
        }
    }
}

type AllocateAnnounceItemInput = {
    announceItemId: string
    quantity: number
}

interface AllocateAnnounceItem {
    execute(input: AllocateAnnounceItemInput): Promise<void>
}

interface ConsultAnnounceTypeInterface {
    consult(announceId: string): Promise<"NORMAL" | "ITEM">
}


class AllocateAnnounceItemImpl implements AllocateAnnounceItem {
    async execute(input: AllocateAnnounceItemInput): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class AllocateOrderItem {

    constructor(
        private readonly consultAnnounceType: ConsultAnnounceTypeInterface,
        private readonly allocateAnnounceNormal: AllocateAnnounceNormal,
        private readonly allocateAnnounceItem: AllocateAnnounceItem
    ){}

    async execute({ products }: AllocateStockForOrderUsecase.Input): Promise<void> {

        for(const product of products){

            const announceType = await this.consultAnnounceType.consult(product.announceId)
            
            switch(announceType){
                case "NORMAL":
                    await this.allocateAnnounceNormal.execute({
                        announceNormalId: product.announceTypeId,
                        quantity: product.quantity
                    })
                    break
                case "ITEM":
                    await this.allocateAnnounceItem.execute({
                        announceItemId: product.announceTypeId,
                        quantity: product.quantity
                    })
                    break
            }
        }
    }
}

export namespace AllocateStockForOrderUsecase {

    export type Product = {
        announceId: string
        announceTypeId: string
        quantity: number
    }

    export type Input = {
        products: Product[]
    }
}