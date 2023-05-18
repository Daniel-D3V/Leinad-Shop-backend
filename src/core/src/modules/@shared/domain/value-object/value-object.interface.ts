export abstract class ValueObject<ValueObjectProps> {
    protected props: ValueObjectProps;

    constructor(props: ValueObjectProps) {
        this.props = props
    }
}