import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AccessTokenGuard } from "src/auth/guard/bearer-token.guard";
import { User } from "src/users/decorator/user.decorator";
import { UsersModel } from "src/users/entities/users.entity";

// 가장 맨 앞에서 요청을 받는 역할. 요청을 받는역할에 최적화 되어 있어야 한다.
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPost();
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  //    예를 들어 id = 1 일 경우 id가 1인 포스트를 가져온다.
  @Get(":id")
  getPost(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  //    post를 생성한다.
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    @User("id") userId,
    @Body("title") title: string,
    @Body("content") content: string
  ) {
    return this.postsService.createPost(+userId, title, content);
  }

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.
  @Put(":id")
  putPost(
    @Param("id", ParseIntPipe) id: number,
    @Body("title") title?: string,
    @Body("content") content?: string
  ) {
    return this.postsService.updatePost(id, title, content);
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.
  @Delete(":id")
  deletePost(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
