import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
  } from '@nestjs/common';
  import { Observable, from } from 'rxjs';
  import { switchMap } from 'rxjs/operators';
  import ApiResponse from '../helper/api-response';
  
  @Injectable()
  export default class ResponseHandlerInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>>
  {
    constructor() {}
  
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            switchMap((data) => {
              const response = context.switchToHttp().getResponse();
              response.status(data.statusCode);
              return from([data]);
            }),
          );
    }
  }
  