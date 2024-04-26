import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import { ErrorCode } from 'COMMON/constants/errorCode';

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
