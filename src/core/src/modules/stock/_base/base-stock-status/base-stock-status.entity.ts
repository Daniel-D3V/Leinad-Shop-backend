

export class BaseStockStatusEntity {

    

}

export namespace BaseStockStatusEntity {

    export type Status = "AVAILABLE" | "DISABLED" | "RESERVED" | "DELIVERYED" 

    export type Props = {
        status: Status
    }
}