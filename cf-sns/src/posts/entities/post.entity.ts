import { IsString } from "class-validator";
import { BaseModel } from "src/common/entities/base.entity";
import { ImageModel } from "src/common/entities/image.entity";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CommentsModel } from "../comments/entities/comments.entity";

// 테이블을 자동으로 생성
@Entity()
export class PostsModel extends BaseModel {
  // 1) UsersModel고ㅏ 연동한다 Foreign Key를 이용해서
  // 2) null이 될 수 없다.
  //
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  title: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;

  @OneToMany((type) => ImageModel, (image) => image.post)
  images: ImageModel[];

  @OneToMany(() => CommentsModel, (comment) => comment.post)
  comments: CommentsModel[];
}
