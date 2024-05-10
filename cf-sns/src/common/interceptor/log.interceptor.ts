import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    /**
     * 요청이 들어올 때 Req 요청이 들어온 타임스탬프를 찍는다.
     * [Req] {요청 path} {요청 시간}
     *
     * 요청이 끝날 때 (응답이 나갈때) 다시 타임스탬프를 찍는다.
     * [Res] {요청 path} {응답 시간} {얼마나 걸렸는지 ms}
     */
    const req = context.switchToHttp().getRequest();

    // /posts
    // /common/image
    const path = req.originalUrl;

    const now = new Date();

    console.log(`[Req] ${path} ${now.toLocaleString("kr")}`);

    // return next.handle()을 실행하는 순간
    // 라우트의 로직이 전부 실행되고 응답이 반환된다.
    // observable로
    return next.handle().pipe(
      tap((observable) =>
        console.log(
          `[Res] ${path} ${new Date().toLocaleString("kr")} ${new Date().getMilliseconds() - now.getMilliseconds()}ms`
        )
      )
      // map((observable) => {
      //   return {
      //     response: observable,
      //     message: "응답이 변경 됐습니다.",
      //   };
      // })
    );
  }
}
