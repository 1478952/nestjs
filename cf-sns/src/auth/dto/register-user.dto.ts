import { PickType } from "@nestjs/mapped-types";
import { UsersModel } from "src/users/entities/users.entity";

export class RegistartUserDto extends PickType(UsersModel, [
  "nickname",
  "email",
  "password",
]) {}
