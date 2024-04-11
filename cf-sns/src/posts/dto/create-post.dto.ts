import { PickType } from "@nestjs/mapped-types";
import { PostsModel } from "../entities/post.entity";

// DTO - Data Transfer Object
export class CreatePostDto extends PickType(PostsModel, ["title", "content"]) {}
