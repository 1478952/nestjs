import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  FindOptionsWhere,
  LessThan,
  MoreThan,
  QueryRunner,
  Repository,
} from "typeorm";
import { PostsModel } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PaginatePostDto } from "./dto/paginate-post.dto";
import { CommonService } from "src/common/common.service";
import { ConfigService } from "@nestjs/config";
import {
  ENV_HOST_KEY,
  ENV_PROTOCOL_KEY,
} from "src/common/const/env-keys.const";
import { basename, join } from "path";
import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from "src/common/const/path.const";
import { promises } from "fs";
import { CreatePostImageDto } from "./image/dto/create-image.dto";
import { ImageModel } from "src/common/entities/image.entity";
import { DEFAULT_POST_FIND_OPTIONS } from "./const/defalut-post-find-options.const";

// controller에서 사용할 로직관련 함수 정의
// 주입할 수 있다.해당 태그를 해줘야지만 프로바이더로 사용할 수 있다.
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel) // 필수로 넣어주어야한다. 모델을 주입하는것.
    private readonly postsRepository: Repository<PostsModel>, // 레포지토리를 사용하는 모든 함수는 비동기이다.
    private readonly commonServices: CommonService,
    private readonly configServices: ConfigService
  ) {}

  async getAllPost() {
    return this.postsRepository.find({
      ...DEFAULT_POST_FIND_OPTIONS,
    });
  }

  async generatePosts(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `test title ${i}`,
        content: `test content ${i}`,
        images: [],
      });
    }
  }

  async cursorPaginatePosts(paginatePostDto: PaginatePostDto) {
    const where: FindOptionsWhere<PostsModel> = {};

    if (paginatePostDto.where__id__less_than) {
      where.id = LessThan(paginatePostDto.where__id__less_than ?? 0);
    } else if (paginatePostDto.where__id__more_than) {
      where.id = MoreThan(paginatePostDto.where__id__more_than ?? 0);
    }

    // 1, 2, 3, 4, 5
    const posts = await this.postsRepository.find({
      where: where,
      order: {
        createdAt: paginatePostDto.order__createdAt,
      },
      take: paginatePostDto.take,
    });

    // 해당되는 포스트가 0개 이상이면
    // 마지막 포스트를 가져오고
    // 아니면 null을 반환한다.
    const lastItem =
      posts.length > 0 && posts.length === paginatePostDto.take
        ? posts[posts.length - 1]
        : null;

    const protocol = this.configServices.get(ENV_PROTOCOL_KEY);
    const host = this.configServices.get(ENV_HOST_KEY);

    const nextUrl = lastItem && new URL(`${protocol}://${host}/posts`);

    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 밸류가 존재하면
       * param에 그대로 붙여넣는다.
       *
       * 단, where__id__more_than 값만 lastItem의 마지막 값으로 넣어준다.
       */
      for (const key of Object.keys(paginatePostDto)) {
        if (paginatePostDto[key]) {
          if (
            key !== "where__id__more_than" &&
            key !== "where__id__less_than"
          ) {
            nextUrl.searchParams.append(key, paginatePostDto[key]);
          }
        }
      }

      let key = null;

      if (paginatePostDto.order__createdAt === "ASC") {
        key = "where__id__more_than";
      } else {
        key = "where__id__less_than";
      }
      nextUrl.searchParams.append(key, lastItem.id.toString());
    }

    /**
     * Response
     *
     * data: Data[]
     * cursor: {
     *  aftrer: 마지막 Data의 ID
     * }
     * count: 응답한 데이터의 갯수
     * next: 다음 요청을 할때 사용할 URL
     */

    return {
      data: posts,
      count: posts.length,
      cursor: {
        after: lastItem?.id ?? null,
      },
      next: nextUrl?.toString() ?? null,
    };
  }

  async pagePaginatePosts(paginatePostDto: PaginatePostDto) {
    /**
     * data: Data[],
     * total: number,
     *
     * [1] [2] [3] [4]
     */

    const posts = await this.postsRepository.findAndCount({
      skip: paginatePostDto.take * (paginatePostDto.page - 1),
      take: paginatePostDto.take,
      order: {
        createdAt: paginatePostDto.order__createdAt,
      },
    });

    return {
      data: posts[0],
      total: posts[1],
    };
  }

  // 1) 오름차 순으로 정렬하는 pagination만 구현한다.
  async paginatePosts(paginatePostDto: PaginatePostDto) {
    return this.commonServices.paginate(
      paginatePostDto,
      this.postsRepository,
      DEFAULT_POST_FIND_OPTIONS,
      "posts"
    );
    // if (paginatePostDto.page) {
    //   return this.pagePaginatePosts(paginatePostDto);
    // } else {
    //   return this.cursorPaginatePosts(paginatePostDto);
    // }
  }

  async getPostById(id: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const post = await repository.findOne({
      ...DEFAULT_POST_FIND_OPTIONS,
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<PostsModel>(PostsModel)
      : this.postsRepository;
  }

  async createPost(authorId: number, postDto: CreatePostDto, qr?: QueryRunner) {
    // 1) create -> 저장할 객체를 생성한다. db에 저장하는게 아니라 객체를 생성하는거기 때문에 동기로 이루어짐
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
    const repository = this.getRepository(qr);

    const post = repository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      images: [],
      likeCount: 0,
      commentCount: 0,
    });

    if (!authorId || !postDto.title || !postDto.content) {
      throw new BadRequestException();
    }

    const newPost = await repository.save(post);

    return newPost;
  }

  async updatePost(id: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;
    // save의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(post);

    return id;
  }

  checkPostExistsById(id: number) {
    return this.postsRepository.exists({
      where: {
        id,
      },
    });
  }

  async isPostMine(userId: number, postId: number) {
    return this.postsRepository.exists({
      where: {
        id: postId,
        author: {
          id: userId,
        },
      },
      relations: {
        author: true,
      },
    });
  }

  async incrementCommentCount(postId: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    await repository.increment(
      {
        id: postId,
      },
      "commentCount",
      1
    );
  }

  async decrementCommentCount(postId: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    await repository.decrement(
      {
        id: postId,
      },
      "commentCount",
      1
    );
  }
}
