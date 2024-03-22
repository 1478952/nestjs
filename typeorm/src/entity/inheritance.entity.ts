import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from "typeorm";

// 1) 평범한 inheritance
// 상속받은 클래스들이 각각 개별의 테이블을 생성하는 inheritance
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

// 2) Single Table Inheritance
// 실제 테이블이 생기는 형태는 하나의 테이블로 모든 엔티티들이 관리됨.
@Entity()
@TableInheritance({
  column: {
    name: "type",
    type: "varchar",
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
  @Column()
  country: string;
}
