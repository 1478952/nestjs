import { Controller, Get } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { PaginateChatDto } from "./dto/paginate-chat.dto";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  paginateChat(dto: PaginateChatDto) {
    return this.chatsService.paginateChats(dto);
  }
}
