import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { SocketCatchHttpExceptionFilter } from "src/common/exception-filter/socket-catch-http.exception-filter";
import { UsersModel } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "src/auth/auth.service";

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: "chats",
})
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatsMessagesService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  server: Server;

  // ws 연결이 끊겼을때.
  handleDisconnect(socket: Socket) {
    console.log(`on disconnect called: ${socket.id}`);
  }

  // gateway가 시작됐을때 실행
  afterInit(server: any) {
    console.log(`after gateway init`);
  }

  // ws이 connection이 됐을때
  // accessToken검증을 handleConnection에서만 해주면 나머지 통신할때 자동으로 user정보를 기입해준다.
  async handleConnection(socket: Socket & { user: UsersModel }) {
    console.log(`on connect called : ${socket.id}`);

    const headers = socket.handshake.headers;

    // Bearer xxxxx
    const rawToken = headers["authorization"];

    if (!rawToken) {
      socket.disconnect();
    }

    try {
      const token = this.authService.extractTokenFromHeader(rawToken, true);

      const payload = await this.authService.verifyToken(token);
      const user = await this.usersService.getUserByEmail(payload.email);

      socket.user = user;

      return true;
    } catch (error) {
      socket.disconnect();
    }
  }

  @UsePipes(
    new ValidationPipe({
      transform: true, // dto 기본값허용
      transformOptions: {
        enableImplicitConversion: true, // class-validator를 사용시 임의로 변환되는 것을 허용
      },
      whitelist: true, // validator가 validation decorator가 적용되어 있지않으면 거부함.
      forbidNonWhitelisted: true, // 정의되어 있지 않은 decorator를 전송하면 에러를 던진다.
    })
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage("enter_chat")
  async enterChat(
    // 방의 chat ID들을 리스트로 받는다.
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket & { user: UsersModel }
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

  @UsePipes(
    new ValidationPipe({
      transform: true, // dto 기본값허용
      transformOptions: {
        enableImplicitConversion: true, // class-validator를 사용시 임의로 변환되는 것을 허용
      },
      whitelist: true, // validator가 validation decorator가 적용되어 있지않으면 거부함.
      forbidNonWhitelisted: true, // 정의되어 있지 않은 decorator를 전송하면 에러를 던진다.
    })
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage("create_chat")
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket & { user: UsersModel }
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  // socket.on("send_message", "hello", (message) => { console.log(message) });
  @UsePipes(
    new ValidationPipe({
      transform: true, // dto 기본값허용
      transformOptions: {
        enableImplicitConversion: true, // class-validator를 사용시 임의로 변환되는 것을 허용
      },
      whitelist: true, // validator가 validation decorator가 적용되어 있지않으면 거부함.
      forbidNonWhitelisted: true, // 정의되어 있지 않은 decorator를 전송하면 에러를 던진다.
    })
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage("send_message")
  async sendMessage(
    @MessageBody() dto: CreateMessagesDto,
    @ConnectedSocket() socket: Socket & { user: UsersModel }
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID : ${dto.chatId}`
      );
    }

    const message = await this.messagesService.createMessage(
      dto,
      socket.user.id
    );

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
