import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { ChatsGateway } from "./chats.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatsModel } from "./entities/chats.entity";
import { CommonService } from "src/common/common.service";

@Module({
  imports: [TypeOrmModule.forFeature([ChatsModel])],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService, CommonService],
})
export class ChatsModule {}
