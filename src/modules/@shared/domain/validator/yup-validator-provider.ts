import * as yup from 'yup';
import { Either, left, right } from '../../logic';
import { YupErrorAdapter } from './yup-error-adapter';

export abstract class YupValidatorProvider {
    abstract schema: yup.Schema<any>

    validateSchema(props: any): Either<Error[], null>{
        try{
            this.schema.validateSync( props, { abortEarly: false })
            return  right(null)
        }catch(err){
            const error = err as yup.ValidationError
            return left(error.errors.map(err => YupErrorAdapter.toDomainFormat(err)))
        }
    }

}