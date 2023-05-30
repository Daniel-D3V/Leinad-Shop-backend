import { BaseEntity } from "@/modules/@shared/domain"

export abstract class BaseStockItemEntity<T> extends BaseEntity<BaseStockItemEntity.Props & T> {

    constructor(props: BaseStockItemEntity.Props & T, id?: string){
        super(props, id)
    }

    abstract toJSON(): Record<string, unknown> 

}


export namespace BaseStockItemEntity  {

    export type Props = {

    }

}