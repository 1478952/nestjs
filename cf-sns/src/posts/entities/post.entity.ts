import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// 테이블을 자동으로 생성
@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn() // 아이디를 따로 입력해줄 필요없이 자동으로 id값을 하나씩 배정 1씩 올라감.
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
