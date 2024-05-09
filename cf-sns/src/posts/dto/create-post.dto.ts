import { PickType } from "@nestjs/mapped-types";
import { PostsModel } from "../entities/post.entity";
import { IsOptional, IsString } from "class-validator";

// DTO - Data Transfer Object
export class CreatePostDto extends PickType(PostsModel, ["title", "content"]) {
  @IsString({
    each: true,
  })
  @IsOptional()
  images: string[] = [];
}
