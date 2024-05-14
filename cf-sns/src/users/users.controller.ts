import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IsPubblic } from "src/common/decorator/is-public.decorator";
import { Roles } from "./decorator/roles.decorator";
import { RolesEnum } from "./const/roles.const";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.AMDIN)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @IsPubblic()
  postUser(
    @Body("nickname") nickname: string,
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return this.usersService.createUser({ nickname, email, password });
  }
}
