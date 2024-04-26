import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import { ErrorCode } from 'COMMON/constants/errorCode';

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
