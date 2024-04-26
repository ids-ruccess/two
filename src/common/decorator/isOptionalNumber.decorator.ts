import { applyDecorators } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export function IsOptionalNumber(value: string, min?: number, max?: number) {
    if (max) {
        return applyDecorators(
            IsOptional(),
            Max(max),
            IsNumber(),
            Type(() => Number),
            Expose(),
        );
    }
    if (min) {
        return applyDecorators(
            IsOptional(),
            Min(min),
            IsNumber(),
            Type(() => Number),
            Expose(),
        );
    }

    if (min && max) {
        return applyDecorators(
            IsOptional(),
            Max(max),
            Min(min),
            IsNumber(),
            Type(() => Number),
            Expose(),
        );
    }

    return applyDecorators(
        IsOptional(),
        IsNumber(),
        Type(() => Number),
        Expose(),
    );
}

export function IsNotEmptyNumber(value: string, min?: number, max?: number) {
    if (max) {
        return applyDecorators(
            Max(max),
            IsNumber(),
            IsNotEmpty(),
            Type(() => Number),
            Expose(),
        );
    }
    if (min) {
        return applyDecorators(
            Min(min),
            IsNumber(),
            IsNotEmpty(),
            Type(() => Number),
            Expose(),
        );
    }

    if (min && max) {
        return applyDecorators(
            Max(max),
            Min(min),
            IsNumber(),
            IsNotEmpty(),
            Type(() => Number),
            Expose(),
        );
    }

    return applyDecorators(
        IsNumber(),
        IsNotEmpty(),
        Type(() => Number),
        Expose(),
    );
}
