import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user.entity";
import { TagModel } from "./tag.entity";

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1 to n || n to 1 은 JoinColumn을 할 필요가없다. n to 1 에서 무조건 id를 갖고있게된다.
  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  // n to n 컬럼은 한쪽 아무곳에나  JoinTable 데코레이터를 지정해주어야한다.
  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
