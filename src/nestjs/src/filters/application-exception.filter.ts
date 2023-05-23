
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ApplicationError } from 'src/utils/application-error';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {

    catch(exception: ApplicationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(exception.getStatus())
            .json(exception.formatErrors());
    }
}