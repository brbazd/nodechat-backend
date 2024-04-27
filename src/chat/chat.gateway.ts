import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  namespace: '/chat'
})
export class ChatGateway {
  constructor(
    private messagesService: MessagesService
) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    // console.log(client, payload)

    console.log(payload.data)

    payload.data.created_at = new Date()

    this.messagesService.createMessage(payload.data.author, payload.data.content, payload.data.created_at).then((res) => {
      payload.data.id = res.id
      this.server.emit('message',payload);
    }) 
  
  
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
   }
  
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   }
  
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
   }
   
}
