import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ChatsMessagesService } from "./messages.service";
import { BasePaginationDto } from "src/common/dto/base-pagination.dto";

@Controller("chats/:cid/messages")
export class MessagesController {
  constructor(private readonly messagesService: ChatsMessagesService) {}

  @Get()
  paginateMessage(
    @Query() dto: BasePaginationDto,
    @Param("cid", ParseIntPipe) cid: number
  ) {
    return this.messagesService.paginateMessages(dto, {
      where: {
        id: cid,
      },
      relations: {
        author: true,
        chat: true,
      },
    });
  }
}
