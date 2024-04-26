import { CallHandler, Catch, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> | Promise<Observable<unknown>> {
        const RESPONSE_IDX = 0;

        return next.handle().pipe(
            map(result => {
                // if (result) return result;

                if (result) {
                    if (context.getArgs()[1]['req']['url'].startsWith('/v2/auths/callback')) return result;
                    return {
                        statusCode: context.getArgs()[RESPONSE_IDX].res.statusCode,
                        success: true,
                        result,
                    };
                } else {
                    return {
                        result: 'no data',
                    };
                }
            }),
        );
    }
}
