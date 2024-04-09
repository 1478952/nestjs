import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/post.entity";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel]), // 모델에 해당되는 레포지토리를 주입할 때 사용
    AuthModule,
    UsersModule,
  ],
  controllers: [PostsController],
  // instance를 넣은게 아닌 class를 그대로 넣음 ioC 컨테이너가 자동으로 인스턴스화하고 관리함
  providers: [PostsService],
})
export class PostsModule {}
