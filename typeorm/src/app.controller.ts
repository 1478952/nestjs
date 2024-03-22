import { Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "./entity/user.entity";
import { Repository } from "typeorm";
import { ProfileModel } from "./entity/profile.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>
  ) {}

  @Post("users")
  postUser() {
    return this.userRepository.save({
      // title: "test title",
    });
  }

  @Get("users")
  getUsers() {
    return this.userRepository.find({
      // entity에서 select: false일때 아래처럼 해주어야 한다.
      // select: {
      //   title: true,
      // }
      // 연결되어있는 테이블의 데이터를 가져와라
      relations: {
        profile: true,
      },
    });
  }

  @Patch("users/:id")
  async patchUser(@Param("id") id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    console.log(user);

    return this.userRepository.save({
      ...user,
    });
  }

  @Post("user/profile")
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: "asdfadsf@sadfasdf.com",
    });

    const profile = await this.profileRepository.save({
      profileImg: "asdfadsf.jpg",
      user,
    });

    return user;
  }

  @Post("user/post")
  async createdUserAndPost() {
    const user = await this.userRepository.save({
      email: "postUser",
    });
  }
}
