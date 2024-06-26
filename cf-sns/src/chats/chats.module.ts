import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { ChatsGateway } from "./chats.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatsModel } from "./entities/chats.entity";
import { CommonService } from "src/common/common.service";
import { ChatsMessagesService } from "./messages/messages.service";
import { MessagesModel } from "./messages/entities/messages.entity";
import { MessagesController } from "./messages/messages.controller";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsModel, MessagesModel]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsGateway, ChatsService, CommonService, ChatsMessagesService],
})
export class ChatsModule {}
