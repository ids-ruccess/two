import { UnauthorizedException } from '@nestjs/common';

export enum ErrorCode {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
    VALIDATION_ERROR,
    FORBIDDEN,
    UNAUTHORIZED_ERROR,
}
