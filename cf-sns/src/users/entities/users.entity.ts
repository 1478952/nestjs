import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/post.entity";
import { BaseModel } from "src/common/entities/base.entity";
import {
  IsEmail,
  IsString,
  Length,
  ValidationArguments,
} from "class-validator";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { emailValidationMessage } from "src/common/validation-message/email-validation.message";
import { Exclude, Expose } from "class-transformer";
import { ChatsModel } from "src/chats/entities/chats.entity";
import { MessagesModel } from "src/chats/messages/entities/messages.entity";
import { CommentsModel } from "src/posts/comments/entities/comments.entity";

@Entity()
// @Exclude() 해당 클래스 전체를 보이지 않게 하고싶다.
export class UsersModel extends BaseModel {
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것
  @Column({
    // 1)
    length: 20,
    // 2)
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  nickname: string;

  @Expose()
  get nicknameAndEmail() {
    return this.nickname + "/" + this.email;
  }

  // 1) 유일무이한 값이 될 것
  @Column({
    // 1)
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidationMessage,
    }
  )
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  /**
   * Request
   * front -> back
   * plain object (JSON) -> class instance (dto)
   *
   * Response
   * back -> front
   * class instance (dto) -> plain object (JSON)
   *
   * toClassOnly -> class instance 변환될때만 -> 요청때만
   * toPlainOnly -> plain object로 변환될때만 -> 응답때만
   *
   * 현상황에선 응답때만 작동
   */
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];

  @ManyToMany(() => ChatsModel, (chats) => chats.users)
  @JoinTable()
  chats: ChatsModel[];

  @OneToMany(() => MessagesModel, (message) => message.author)
  messages: MessagesModel[];

  @OneToMany(() => CommentsModel, (comment) => comment.author)
  comments: CommentsModel[];
}
