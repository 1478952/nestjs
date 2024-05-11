import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateChatDto } from "./dto/create-chat.dto";
import { ChatsService } from "./chats.service";

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: "chats",
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  @SubscribeMessage("enter_chat")
  enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: number[],
    @ConnectedSocket() socket: Socket
  ) {
    for (const chatId of data) {
      // socket.join()
      socket.join(chatId.toString());
    }
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
  sendMessage(
    @MessageBody() message: { message: string; chatId: number },
    @ConnectedSocket() socket: Socket
  ) {
    // 나를 제외한 사람에게 메세지를 보낸다.
    socket
      .to(message.chatId.toString())
      .emit("receive_message", message.message);

    // 방에 있는 모두에게 메세지를 보낸다.
    // this.server
    //   .in(message.chatId.toString())
    //   .emit("receive_message", message.message);
  }
}
