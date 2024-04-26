import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'COMMON/constants/errorCode';
import { BaseException } from 'COMMON/filter/exception/base.exception';
import { ErrorTypeEnum } from 'COMMON/filter/exception/exception.type';

export class ServerException extends BaseException {
    constructor(message: string) {
        super({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
            message,
            errorType: ErrorTypeEnum.ERROR,
        });
    }
}
