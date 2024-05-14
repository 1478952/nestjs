import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModel } from "./entities/post.entity";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { CommonModule } from "src/common/common.module";
import { MulterModule } from "@nestjs/platform-express";
import { extname } from "path";
import * as multer from "multer";
import { v4 as uuid } from "uuid";
import { POST_IMAGE_PATH } from "src/common/const/path.const";
import { ImageModel } from "src/common/entities/image.entity";
import { PostImageService } from "./image/image.service";
import { LogMiddleware } from "src/common/middleware/log.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel, ImageModel]), // 모델에 해당되는 레포지토리를 주입할 때 사용
    AuthModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [PostsController],
  // instance를 넣은게 아닌 class를 그대로 넣음 ioC 컨테이너가 자동으로 인스턴스화하고 관리함
  providers: [PostsService, PostImageService],
  exports: [PostsService],
})
export class PostsModule {}
