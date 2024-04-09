import { Column, Entity, OneToMany } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/post.entity";
import { BaseModel } from "src/common/entities/base.entity";

@Entity()
export class UsersModel extends BaseModel {
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것
  @Column({
    // 1)
    length: 20,
    // 2)
    unique: true,
  })
  nickname: string;

  // 1) 유일무이한 값이 될 것
  @Column({
    // 1)
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
