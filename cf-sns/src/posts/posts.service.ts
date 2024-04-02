import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostsModel } from "./entities/post.entity";

// controller에서 사용할 로직관련 함수 정의
// 주입할 수 있다.해당 태그를 해줘야지만 프로바이더로 사용할 수 있다.
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel) // 필수로 넣어주어야한다. 모델을 주입하는것.
    private readonly postsRepository: Repository<PostsModel> // 레포지토리를 사용하는 모든 함수는 비동기이다.
  ) {}

  async getAllPost() {
    return this.postsRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다. db에 저장하는게 아니라 객체를 생성하는거기 때문에 동기로 이루어짐
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    if (!authorId || !title || !content) {
      throw new BadRequestException();
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(id: number, title: string, content: string) {
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
}
