import { BaseEntity } from "@/modules/@shared/domain";


export class CustomerEntity extends BaseEntity<CustomerEntity.Props> {

    private constructor(props: CustomerEntity.Props, id?: string){
        super(props, id)
    }

    static create(props: CustomerEntity.Props, id?: string): CustomerEntity {
        const customerEntity = new CustomerEntity(props, id)
        return customerEntity
    }

    toJSON(): CustomerEntity.PropsJSON {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }

    get name(): string {
        return this.props.name
    }
    get email(): string {
        return this.props.email
    }
}


export namespace CustomerEntity {
    
    export type Input = {
        name: string
        email: string
    }
    export type Props = {
        name: string
        email: string
    }

    export type PropsJSON = Props & { id: string }
}