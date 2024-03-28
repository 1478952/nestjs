import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

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
}