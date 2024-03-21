import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.
  // @PrimaryGeneratedColumn()
  // PrimaryColumn은 모든 테이블에서 기본적으로 존재해야한다. (생성하지않음.)
  // 테이블 안에서 각각의 Row를 구분할 수 있는 컬럼이다.
  // @PrimaryColumn()

  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
  // 1, 2, 3, 4, ... -> 99999
  //
  // UUID
  // asdfsadfweafa-fewfaewfdsvxv-safewfsadfdsvxzcv-eawfdvxzcvsadf
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // 제목
  @Column()
  title: string;

  // 생성일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 수정일자
  // 데이터가 수정되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 수정 될때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated("uuid")
  additionalId: string;
}
