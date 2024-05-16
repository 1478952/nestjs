import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommonService } from "src/common/common.service";
import { PaginateCommentDto } from "./dto/paginate-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsModel } from "./entities/comments.entity";
import { QueryRunner, Repository } from "typeorm";
import { CreateCommentsDto } from "./dto/create-comments.dto";
import { UsersModel } from "src/users/entities/users.entity";
import { DEFAULT_COMMENT_FIND_OPTIONS } from "./const/defalut-comment-find-options.const";
import { UpdateCommentsDto } from "./dto/update-comments.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsModel)
    private readonly commentRepository: Repository<CommentsModel>,
    private readonly commonService: CommonService
  ) {}

  paginateComment(dto: PaginateCommentDto, postId: number) {
    return this.commonService.paginate(
      dto,
      this.commentRepository,
      {
        ...DEFAULT_COMMENT_FIND_OPTIONS,
        where: {
          post: {
            id: postId,
          },
        },
      },
      `posts/${postId}/comments`
    );
  }

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CommentsModel>(CommentsModel)
      : this.commentRepository;
  }

  async getCommentById(id: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const commnets = await repository.findOne({
      ...DEFAULT_COMMENT_FIND_OPTIONS,
      where: {
        id: id,
      },
    });

    if (!commnets) {
      throw new NotFoundException();
    }

    return commnets;
  }

  async createComment(
    dto: CreateCommentsDto,
    postId: number,
    author: UsersModel,
    qr?: QueryRunner
  ) {
    const repository = this.getRepository(qr);

    return repository.save({
      ...dto,
      post: {
        id: postId,
      },
      author,
    });
  }

  async updateComment(dto: UpdateCommentsDto, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException(`존재하지 않는 댓글입니다.`);
    }

    const prevComment = await this.commentRepository.preload({
      id: commentId,
      ...dto,
    });

    const newComment = await this.commentRepository.save(prevComment);

    return newComment;
  }

  async deleteComment(commentId: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const comment = await repository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException(`존재하지 않는 댓글입니다.`);
    }

    await repository.delete(commentId);

    return commentId;
  }

  async isCommentMine(userId: number, postId: number, commentId: number) {
    return this.commentRepository.exists({
      where: {
        id: postId,
        author: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
      relations: {
        author: true,
        post: true,
      },
    });
  }
}
