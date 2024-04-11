import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./posts/entities/post.entity";
import { UsersModule } from "./users/users.module";
import { UsersModel } from "./users/entities/users.entity";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  // 다른 모듈을 불러올 때 사용.
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // 데이터베이스 연결시 사용
      type: "postgres", // 데이터베이스 타입
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [PostsModel, UsersModel], // 생성할 테이블 모델 자동으로 생성함
      synchronize: true, // nestjs에서 작성하는 typeorm 코드와 db의 싱크를 맞출거냐? 개발환경에선 true 프로덕션에서는 false
    }),
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
      /**
       * serialization -> 직렬화 -> 현재 시스템에서 사용되는 (NestJS) 데이터의 구조를 다른 시스템에서도 쉽게 사용 할 수 있는 포맷으로 변환
       * -> class의 object에서 JSON 포맷으로 변환
       *
       * deserialization -> 역직렬화
       *
       * 현 프로젝트에서는 class-transformer Exclude 에서 사용
       */
    },
  ],
})
export class AppModule {}
