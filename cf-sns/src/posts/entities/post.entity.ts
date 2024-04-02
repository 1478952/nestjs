import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// 테이블을 자동으로 생성
@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn() // 아이디를 따로 입력해줄 필요없이 자동으로 id값을 하나씩 배정 1씩 올라감.
  id: number;

  // 1) UsersModel고ㅏ 연동한다 Foreign Key를 이용해서
  // 2) null이 될 수 없다.
  //
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
