import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import { ErrorCode } from 'COMMON/constants/errorCode';

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super({
            message: message,
            statusCode: HttpStatus.NOT_FOUND,
            errorType: ErrorTypeEnum.WARN,
            errorCode: ErrorCode.NOT_FOUND,
        });
    }
}
