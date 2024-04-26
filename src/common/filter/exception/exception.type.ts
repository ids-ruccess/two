export type BaseExceptionPropertyType = 'statusCode' | 'errorType' | 'raw' | 'errorCode' | 'errorMessage';

export type ExceptionPropertyType = 'errorMessage' | 'raw';

export enum ErrorTypeEnum {
    WARN = 'warn',
    ERROR = 'error',
}
