import { Either, left, right } from "@/modules/@shared/logic";
import { BaseAnnounceEntity } from "@/modules/announce/_base";

export class AnnounceNormalEntity extends BaseAnnounceEntity<AnnounceNormalEntity.Props> {

    private constructor(props: AnnounceNormalEntity.Props, id?: string){
        super(props, id)
    }

    static create({ price, announceId }: AnnounceNormalEntity.Input, id?: string): Either<Error[], AnnounceNormalEntity> {
        
        const validationResult = AnnounceNormalEntity.validateProps({ price })
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const announceNormalEntity = new AnnounceNormalEntity({
            price,
            announceId,
            stockType: "MANUAL"
        }, id)
        return right(announceNormalEntity)
    }

    toStockManual(){
        this.props.stockType = "MANUAL"
    }
    toStockAuto(){
        this.props.stockType = "AUTO"
    }
    isStockManual(): boolean {
        return this.props.stockType === "MANUAL"
    }
    isStockAuto(): boolean {
        return this.props.stockType === "AUTO"
    }

    toJSON(): AnnounceNormalEntity.PropsJSON {
        return {
            id: this.id,
            price: this.getPrice(),
            announceId: this.announceId,
            stockType: this.stockType
        }
    }

    get announceId(): string {
        return this.props.announceId
    }
    get stockType(): AnnounceNormalEntity.StockType {
        return this.props.stockType
    }
}

export namespace AnnounceNormalEntity {



    export type StockType = "MANUAL" | "AUTO" 

    export type Input = { 
        price: number
        announceId: string
    }
    export type Props = BaseAnnounceEntity.Props & {
        stockType: StockType
        announceId: string
    }
    export type PropsJSON = Props & { id: string }
}