import { BaseEntity } from "@/modules/@shared/domain";
import { randomBytes } from 'crypto';

export class VerificationCodeEntity extends BaseEntity<VerificationCodeEntity.Props> {

    constructor(props: VerificationCodeEntity.Props, id?: string){
        super(props, id);
    }

    static create({ code, expirationDate, userId }: VerificationCodeEntity.Input, id?: string): VerificationCodeEntity {
        const verificationCodeEntity = new VerificationCodeEntity({
            code: code ?? VerificationCodeEntity.generateRandomCode(),
            expirationDate: expirationDate ?? VerificationCodeEntity.generateExpirationDate(),
            userId
        }, id);
        return verificationCodeEntity;
    }

    static generateRandomCode(): string {
        return randomBytes(64).toString('hex');
    } 

    static generateExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 45);
        return expirationDate;
    }

    isExpired(): boolean {
        return this.expirationDate < new Date();
    }

    toJSON(): VerificationCodeEntity.PropsJSON{
        return {
            id: this.id,
            code: this.code,
            expirationDate: this.expirationDate,
            userId: this.userId
        }
    }

    get code(): string {
        return this.props.code;
    }
    get expirationDate(): Date {
        return this.props.expirationDate;
    }
    get userId(): string {
        return this.props.userId;
    }
}

export namespace VerificationCodeEntity {

    export type Input = {
        code?: string
        expirationDate?: Date
        userId: string
    }

    export type Props = {
        code: string
        expirationDate: Date
        userId: string
    }

    export type PropsJSON = Props & { id: string }
}