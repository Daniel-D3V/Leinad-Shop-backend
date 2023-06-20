import { BaseEntity } from "@/modules/@shared/domain"


export class TwoFactorAuthenticationEntity extends BaseEntity<TwoFactorAuthenticationEntity.Props> {

    private constructor(props: TwoFactorAuthenticationEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: TwoFactorAuthenticationEntity.Input, id?: string): TwoFactorAuthenticationEntity{
        
        const twoFactorAuthenticationEntity = new TwoFactorAuthenticationEntity({
            ...input
        }, id)
        return twoFactorAuthenticationEntity
    }

    isValid(): boolean {
        return this.props.isValid
    }

    validate(): void {
        this.props.isValid = true
    }

    toJSON():TwoFactorAuthenticationEntity.PropsJSON {
        return {
            id: this.id,
            userId: this.userId,
            secret: this.secret,
            isValid: this.isValid()
        }
    }

    get secret(): string {
        return this.props.secret
    }
    get userId(): string {
        return this.props.userId
    }
}

export namespace TwoFactorAuthenticationEntity {

    export type Input = {
        secret: string
        userId: string
        isValid: boolean
    }

    export type Props = {
        secret: string
        userId: string
        isValid: boolean
    }

    export type PropsJSON = Props & { id: string }
}