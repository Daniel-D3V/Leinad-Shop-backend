import { BaseEntity } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceValidatorFactory } from "./validator";

export class AnnounceEntity extends BaseEntity<AnnounceEntity.Props> {

    private constructor(props: AnnounceEntity.Props, id?: string) {
        super(props, id);
    }

    static create(input: AnnounceEntity.Input, id?: string): Either<Error[], AnnounceEntity>{

        const announceValidator = AnnounceValidatorFactory.create()
        const isInputValid = announceValidator.validate(input)
        if (isInputValid.isLeft()) return left(isInputValid.value)

        const announceEntity = new AnnounceEntity({
            ...input,
            status: "DEACTIVATED"
        }, id)

        return right(announceEntity)
    }

    activate(): void {
        this.props.status = "ACTIVE"
    }

    deactivate(): void {
        this.props.status = "DEACTIVATED"
    }

    ban(): void {
        this.props.status = "BANNED"
    }

    isActive(): boolean {
        return this.props.status === "ACTIVE"
    }

    toJSON(): AnnounceEntity.PropsJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            userId: this.userId,
            categoryId: this.categoryId,
            status: this.status
        }
    }

    get title(): string {
        return this.props.title;
    }
    get description(): string {
        return this.props.description;
    }
    get price(): number {
        return this.props.price;
    }
    get status(): AnnounceEntity.Status {
        return this.props.status
    }
    get categoryId(): string {
        return this.props.categoryId;
    }
    get userId(): string {
        return this.props.userId;
    }
}


export namespace AnnounceEntity {

    export type Status = "ACTIVE" | "DEACTIVATED" | "BANNED"

    export type Input = {
        title: string
        description: string
        price: number
        categoryId: string
        userId: string

    }
    export type Props = {
        title: string
        description: string
        price: number
        status: Status

        categoryId: string
        userId: string
    }
    export type PropsJSON = Props & { id: string }
} 