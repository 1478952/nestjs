import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  // Entity Embedding
  // 참조한 클래스의 컬럼값들이 nameFirst, nameLast 이런식으로 구성이됨
  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column()
  salary: string;
}
