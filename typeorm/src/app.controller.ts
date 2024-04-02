import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "./entity/user.entity";
import { ILike, LessThan, Repository } from "typeorm";
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";
import { TagModel } from "./entity/tag.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>
  ) {}

  @Post("sample")
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: "test@naver.com",
    // });
    // 저장
    // const user2 = await this.userRepository.save({
    //   email: "test@naver.com"
    // })
    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음 find + create
    // const user1 = await this.userRepository.preload({
    //   id: 101,
    //   email: "test2@naver.com"
    // })
    // 삭제하기
    // await this.userRepository.delete(101);
    // 해당 조건에 해당되는 row의 count값을 2만큼 증가시킨다.
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   "count",
    //   2
    // );
    // 해당 조건에 해당되는 row의 count값을 1만큼 감소시킨다.
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   "count",
    //   1
    // );
    // 갯수 카운팅하기 0이라는 글자를 가지고 있는 email의 개수를 검색
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike("%0%"),
    //   },
    // });
    // email에 0이라는 글자를 가지고 있는 Row의 count를 전부다 더한다
    // const sum = await this.userRepository.sum("count", {
    //   email: ILike("%0%"),
    // });
    // id가 4보다 작은 Row의 count 평균을 구함
    // const average = await this.userRepository.average("count", {
    //   id: LessThan(4),
    // });
    // 최솟값
    // const min = await this.userRepository.minimum("count", {
    //   id: LessThan(4)
    // })
    // 최대값
    // const max = await this.userRepository.maximum("count", {
    //   id: LessThan(4)
    // })
    // 모든 user테이블의 값 조회
    // const users = await this.userRepository.find()
    // 하나의 로우 조회
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3
    //   }
    // })
    // 20개까지 user Row데이터와 전체 데이터갯수를 반환함
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 20,
    // });
  }

  @Post("users")
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Get("users")
  getUsers() {
    return this.userRepository.find({
      where: {
        // 아닌경우 가져오기
        // id: Not(1),
        // 적은경우 가져오기
        // id: LessThan(30),
        // 적거나 같은경우
        // id: LessThanOrEqual(30),
        // 많은경우
        // id: MoreThan(30)
        // 많거나 같은경우
        // id: MoreThanOrEqual(30),
        // 같은경우
        // id: Equal(30),
        // 유사값 %{string} 앞에 아무것이나 와도 상관없다. %{string}% 앞뒤로 아무것이나 와도 상관없다.
        // email: Like("%google%")
        // 대문자 소문자 구분 안하는 유사값
        // email: ILike("%GOOGLE%")
        // 사이값
        // id: Between(10, 15)
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 99]),
        // null인 경우 가져오기
        // id: IsNull(),
      },

      // entity에서 select: false일때 아래처럼 해주어야 한다.
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다 -> select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져온다. 아래는 id만 가져온다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      // },
      // 필터링할 조건을 입력하게된다. and 조건으로 묶임
      // where: {
      //   version: 1,
      // },
      // 필터링할 조건을 입력하게된다. or 조건으로 묶임
      // where: [
      //   { id: 3 },
      //   {
      //     version: 1,
      //   },
      // ],
      // 연결되어있는 테이블의 데이터를 가져와라
      // relations: {
      //   profile: true,
      //   posts: true,
      // },
      // 오름차 내림차
      // ASC -> 오름차
      // DESC -> 내림차
      // order: {
      //   id: "ASC",
      // },
      // 처음 몇개를 제외할지,
      // skip: 0,
      // 몇개를 가져올지
      // take: 1,
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

  @Delete("user/profile/:id")
  async deleteProfile(@Param("id") id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post("user/profile")
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: "asdfadsf@sadfasdf.com",
      // cascade: true시 가능
      profile: {
        profileImg: "asdfadsf.jpg",
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: "asdfadsf.jpg",
    //   user,
    // });

    return user;
  }

  @Post("user/post")
  async createdUserAndPost() {
    const user = await this.userRepository.save({
      email: "postUser",
    });
    await this.postRepository.save({
      title: "post 1",
      author: user,
    });
    await this.postRepository.save({
      title: "post 2",
      author: user,
    });

    return user;
  }

  @Post("posts/tags")
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: "tag test 1",
    });

    const post2 = await this.postRepository.save({
      title: "tag test 2",
    });

    const tag1 = await this.tagRepository.save({
      name: "tag 1",
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: "tag 2",
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: "tag test 3",
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get("posts")
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get("tags")
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
