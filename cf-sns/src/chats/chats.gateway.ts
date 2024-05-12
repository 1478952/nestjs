import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateChatDto } from "./dto/create-chat.dto";
import { ChatsService } from "./chats.service";
import { EnterChatDto } from "./dto/enter-chat.dto";
import { CreateMessagesDto } from "./messages/dto/create-messages.dto";
import { ChatsMessagesService } from "./messages/messages.service";

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: "chats",
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatsMessagesService
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage("enter_chat")
  async enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket
  ) {
    // for (const chatId of data) {
    // socket.join()
    // socket.join(chatId.toString());
    // }

    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkIfChatExists(chatId);

      if (!exists) {
        throw new WsException({
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
          code: 100,
        });
      }
    }

    socket.join(data.chatIds.map((x) => x.toString()));
  }

  @SubscribeMessage("create_chat")
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  // socket.on("send_message", "hello", (message) => { console.log(message) });
  @SubscribeMessage("send_message")
  async sendMessage(
    @MessageBody() dto: CreateMessagesDto,
    @ConnectedSocket() socket: Socket
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`
      );
    }

    const message = await this.messagesService.createMessage(dto);

    // 나를 제외한 사람에게 메세지를 보낸다. broadcast
    socket
      .to(message.chat.id.toString())
      .emit("receive_message", message.message);

    // 방에 있는 모두에게 메세지를 보낸다.
    // this.server
    //   .in(message.chatId.toString())
    //   .emit("receive_message", message.message);
  }
}
