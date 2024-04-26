import { HttpException } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { ErrorTypeEnum } from '../../enum/errorType.enum';
import ErrorMessage from 'COMMON/constants/errorMessage';
import { ErrorCode } from 'COMMON/constants/errorCode';

export class BaseException extends HttpException {
    @Exclude() private _statusCode: number;
    @Exclude() private _stack?: string;
    @Exclude() private _errorCode: ErrorCode;
    @Exclude() private _errorMessage: ErrorMessage | string;
    @Exclude() private _errorType: ErrorTypeEnum = ErrorTypeEnum.ERROR;

    constructor(param: {
        message: string | ErrorMessage;
        statusCode: number;
        errorCode: ErrorCode;
        errorType?: ErrorTypeEnum;
        stack?: string;
    }) {
        super(param.message, param.statusCode);
        this._statusCode = param.statusCode;
        this._errorMessage = param.message;
        this._errorCode = param.errorCode;
        param.stack && (this.stack = param.stack);
        param.errorType && (this.errorType = param.errorType);
    }

    @Expose()
    get errorType(): ErrorTypeEnum {
        return this._errorType;
    }

    @Expose()
    get statusCode(): number {
        return this._statusCode;
    }

    @Expose()
    get errorMessage(): ErrorMessage | string {
        return this._errorMessage;
    }

    @Expose()
    get errorCode(): ErrorMessage | string {
        return this._errorCode;
    }

    @Expose()
    get stack(): string | undefined {
        return this._stack;
    }

    getResponse() {
        return {
            statusCode: this.statusCode,
            success: false,
            error: {
                message: this.errorMessage,
                errorCode: this.errorCode,
                errorType: this.errorType,
                stack: this.stack,
            },
        };
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }

    set stack(value: string) {
        this._stack = value;
    }

    set errorType(value: ErrorTypeEnum) {
        this._errorType = value;
    }

    set errorMessage(value: ErrorMessage | string) {
        this._errorMessage = value;
    }

    set errorCode(value: ErrorCode) {
        this._errorCode = value;
    }
}
