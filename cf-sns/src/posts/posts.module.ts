import { BadRequestException, Module } from "@nestjs/common";
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

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel]), // 모델에 해당되는 레포지토리를 주입할 때 사용
    AuthModule,
    UsersModule,
    CommonModule,
    MulterModule.register({
      limits: {
        // 바이트 단위로 입력
        fieldSize: 10000000, // 10mb
      },
      fileFilter: (req, file, cb) => {
        /**
         * cb(에러, boolean)
         *
         * 첫번째 파라미터에는 에러가 있을경우 에러 정보를 넣어준다.
         * 두번째 파라미터에는 파일을 받을지 말지 boolean을 넣어준다.
         */
        // xxx.jpg -> .jpg
        const ext = extname(file.originalname);

        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
          return cb(
            new BadRequestException("jpg/jpeg/png 파일만 업로드 가능합니다."),
            false
          );
        }

        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, res, cb) {
          cb(null, POST_IMAGE_PATH);
        },
        filename: function (req, file, cb) {
          // 123123-123-123123-123123
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PostsController],
  // instance를 넣은게 아닌 class를 그대로 넣음 ioC 컨테이너가 자동으로 인스턴스화하고 관리함
  providers: [PostsService],
})
export class PostsModule {}
