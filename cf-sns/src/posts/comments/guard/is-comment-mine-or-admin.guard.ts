import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RolesEnum } from "src/users/const/roles.const";
import { CommentsService } from "../comments.service";

@Injectable()
export class IsCommentMineOrAdminGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { user } = req;

    if (!user) {
      throw new UnauthorizedException(`사용자 정보를 가져올 수 없습니다.`);
    }

    /**
     * Admin일 경우 그냥 패스
     */

    if (user.role === RolesEnum.AMDIN) {
      return true;
    }

    const postId = req.params.postId;

    if (!postId) {
      throw new BadRequestException(`Post ID가 파라미터로 제공 돼야합니다.`);
    }

    const commentId = req.params.commentId;

    if (!commentId) {
      throw new BadRequestException(`Comment ID가 파라미터로 제공 돼야합니다.`);
    }

    const isOk = await this.commentsService.isCommentMine(
      user.id,
      parseInt(postId),
      parseInt(commentId)
    );

    if (!isOk) {
      throw new ForbiddenException("권한이 없습니다.");
    }

    return true;
  }
}
