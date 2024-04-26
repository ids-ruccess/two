import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BaseException } from './base.exception';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import { ErrorCode } from 'COMMON/constants/errorCode';

export class ValidationException extends BaseException {
    constructor(errors: ValidationError[]) {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            errorCode: ErrorCode.VALIDATION_ERROR,
            message: errors
                .map((error, idx) => {
                    const { property, value, constraints } = error;

                    const joinedConstraints = Object.values(constraints!)
                        .map(value => value)
                        .join(` + `);

                    return `[property: ${property}, value: ${value}] ${joinedConstraints}`;
                })
                .join(` && `),
            stack: new Error(JSON.stringify(errors)).stack,
        });

        this.errorType = ErrorTypeEnum.WARN;
    }
}
