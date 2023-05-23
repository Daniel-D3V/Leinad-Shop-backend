
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ApplicatonError } from 'src/utils/application-error';

@Catch(ApplicatonError)
export class ApplicationExceptionFilter implements ExceptionFilter {

    catch(exception: ApplicatonError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(exception.getStatus())
            .json(exception.formatErrors());
    }
}