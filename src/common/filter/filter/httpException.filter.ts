import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseException } from './exception/base.exception';
import { ErrorCode } from 'COMMON/constants/errorCode';
import { LogService } from 'LIBS/log/log.service';
import { ErrorTypeEnum } from 'COMMON/enum/errorType.enum';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logService: LogService,
        private readonly httpAdapterHost: HttpAdapterHost,
    ) {}

    catch(error: unknown, host: ArgumentsHost): any {
        const exception = (() => {
            if (error instanceof BaseException) {
                return error;
            }

            if (error instanceof HttpException) {
                return new BaseException({
                    message: error.message,
                    errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    stack: error.stack,
                });
            }

            let lastError = error as Error;
            return new BaseException({
                message: lastError.message,
                errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                stack: lastError.stack,
            });
        })();

        exception.errorType === ErrorTypeEnum.ERROR
            ? this.logService.error('error', exception)
            : this.logService.warn('warn', exception);

        this.httpAdapterHost.httpAdapter.reply(
            (() => host.switchToHttp().getResponse())(),
            exception.getResponse(),
            exception.getStatus(),
        );
    }
}
