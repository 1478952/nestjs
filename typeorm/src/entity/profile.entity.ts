import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user.entity";

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 어떤 프로퍼티끼리 연결할지 연결만 해주면된다.
  @OneToOne(() => UserModel, (user) => user.profile)
  // JoinColoumn user 테이블에있는 아이디를 profile 테이블에서 가지고 있는다.
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
