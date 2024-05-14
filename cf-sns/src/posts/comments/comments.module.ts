import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { CommonModule } from "src/common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModel } from "./entities/comments.entity";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { PostExistsMiddleware } from "./middleware/post-exists.middleware";
import { PostsModule } from "../posts.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsModel]), // 모델에 해당되는 레포지토리를 주입할 때 사용
    CommonModule,
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostExistsMiddleware).forRoutes(CommentsController);
  }
}
