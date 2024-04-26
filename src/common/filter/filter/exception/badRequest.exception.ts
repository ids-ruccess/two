import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'COMMON/constants/errorCode';
import { ErrorTypeEnum } from 'COMMON/enum/errorType.enum';

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super({
            message,
            errorCode: ErrorCode.BAD_REQUEST,
            statusCode: HttpStatus.BAD_REQUEST,
            errorType: ErrorTypeEnum.WARN,
        });
    }
}
