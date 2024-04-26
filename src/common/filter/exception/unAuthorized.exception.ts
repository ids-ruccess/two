import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import { ErrorCode } from 'COMMON/constants/errorCode';

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super({
            message: message,
            statusCode: HttpStatus.UNAUTHORIZED,
            errorType: ErrorTypeEnum.WARN,
            errorCode: ErrorCode.UNAUTHORIZED_ERROR,
        });
    }
}
