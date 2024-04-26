import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'COMMON/constants/errorCode';
import { ErrorTypeEnum } from 'COMMON/enum/errorType.enum';

export class ForbiddenException extends BaseException {
    constructor(message: string) {
        super({
            message: message,
            statusCode: HttpStatus.FORBIDDEN,
            errorType: ErrorTypeEnum.WARN,
            errorCode: ErrorCode.FORBIDDEN,
        });
    }
}
