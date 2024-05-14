import { IsNumber, IsString } from "class-validator";
import { BaseModel } from "src/common/entities/base.entity";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { PostsModel } from "src/posts/entities/post.entity";
import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class CommentsModel extends BaseModel {
  @ManyToOne(() => UsersModel, (user) => user.comments)
  author: UsersModel;

  @ManyToOne(() => PostsModel, (post) => post.comments)
  post: PostsModel;

  @Column()
  @IsString({ message: stringValidationMessage })
  comment: string;

  @Column({
    default: 0,
  })
  @IsNumber()
  likeCount: number;
  // * likeCount -> 좋아요 갯수
}
