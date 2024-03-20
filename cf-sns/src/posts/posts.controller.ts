import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const posts: PostModel[] = [
  {
    id: 1,
    author: 'test_author1',
    title: '타이틀1',
    content: '콘텐츠1',
    likeCount: 1,
    commentCount: 1,
  },
  {
    id: 2,
    author: 'test_author2',
    title: '타이틀2',
    content: '콘텐츠2',
    likeCount: 2,
    commentCount: 2,
  },
  {
    id: 3,
    author: 'test_author3',
    title: '타이틀3',
    content: '콘텐츠3',
    likeCount: 3,
    commentCount: 3,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  //    예를 들어 id = 1 일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id.toString() === id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  //    post를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    if (!author || !title || !content) {
      throw new BadRequestException();
    }

    posts.push(post);

    return post;
  }

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.
}
