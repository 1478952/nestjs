import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AccessTokenGuard } from "src/auth/guard/bearer-token.guard";
import { User } from "src/users/decorator/user.decorator";
import { UsersModel } from "src/users/entities/users.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PaginatePostDto } from "./dto/paginate-post.dto";
import { ImageModelType } from "src/common/entities/image.entity";
import { PostImageService } from "./image/image.service";
import { LogInterceptor } from "src/common/interceptor/log.interceptor";
import { TransactionInterceptor } from "src/common/interceptor/transaction.interceptor";
import { QueryRunner } from "src/common/decorator/query-runner.decorator";

// 가장 맨 앞에서 요청을 받는 역할. 요청을 받는역할에 최적화 되어 있어야 한다.
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly imageService: PostImageService
  ) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  // @UseInterceptors(LogInterceptor)
  async getPosts(@Query() query: PaginatePostDto) {
    // return this.postsService.getAllPost();
    return this.postsService.paginatePosts(query);
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  //    예를 들어 id = 1 일 경우 id가 1인 포스트를 가져온다.
  @Get(":id")
  getPost(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // POST /posts/random
  @Post("random")
  @UseGuards(AccessTokenGuard)
  async postPostsRandom(@User() user: UsersModel) {
    await this.postsService.generatePosts(user.id);
    return true;
  }

  // 3) POST /posts
  //    post를 생성한다.
  // A Model, B Model
  // Post API => A 모델을 저장하고, B 모델을 저장한다.
  // await repository.save(a);
  // await repository.save(b);
  //
  // 만약 a를 저장하다가 실패하면 b를 저장하면 안될경우
  // all or nothing
  //
  // transaction
  // start -> 시작
  // commit -> 저장
  // rollback -> 원상복구
  @Post()
  @UseGuards(AccessTokenGuard)
  // @UseInterceptors(FileInterceptor("image"))
  @UseInterceptors(TransactionInterceptor)
  async postPosts(
    @User("id") userId,
    // @Body("title") title: string,
    // @Body("content") content: string
    @Body() body: CreatePostDto,
    // @UploadedFile() file?:  Express.Multer.File
    @QueryRunner() qr
  ) {
    // 로직 실행
    // return this.postsService.createPost(+userId, body, file?.filename);
    const post = await this.postsService.createPost(+userId, body, qr);

    for (let i = 0; i < body.images.length; i++) {
      await this.imageService.createPostImage(
        {
          post,
          order: i,
          path: body.images[i],
          type: ImageModelType.POST_IMAGE,
        },
        qr
      );
    }

    return this.postsService.getPostById(post.id, qr);
  }

  // 4) PATCH /posts/:id
  //    id에 해당되는 POST를 변경한다.
  @Patch(":id")
  patchPost(
    @Param("id", ParseIntPipe) id: number,
    // @Body("title") title?: string,
    // @Body("content") content?: string
    @Body() body: UpdatePostDto
  ) {
    return this.postsService.updatePost(id, body);
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.
  @Delete(":id")
  deletePost(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
