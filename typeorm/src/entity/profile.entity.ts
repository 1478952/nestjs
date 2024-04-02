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
  user: UserModel;

  @Column()
  profileImg: string;
}
